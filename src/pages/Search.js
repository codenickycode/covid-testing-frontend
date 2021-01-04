import React, { useState } from 'react';
import dayjs from 'dayjs';
import * as tools from './Search/tools/tools.js';
import {
  storeLocations,
  storeDistances,
} from './Search/tools/storeLocations.js';
import * as store from '../store.js';
import SearchForm from './Search/Form.js';
import SearchResults from './Search/Results.js';

const Loading = () => <h1>Loading...</h1>;

const format = 'MMMM D, YYYY';
const today = dayjs().format(format);

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');
  const [date, setDate] = useState(today);
  const [locations, setLocations] = useState([]);

  const handleSubmit = async (tests, zip) => {
    setLoading(true);
    try {
      await storeLocations(date);
      await storeDistances(zip);
      const filtered = tools.filterLocationsBy('tests', tests);
      const sorted = tools.sortDistance(filtered);
      setLocations(sorted);
      setShowResults(true);
      setError('');
    } catch (e) {
      const error = e.response != null ? e.response.data : e.message;
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortBy = (type) => {
    let sorted = tools.sortDistance(locations);
    if (type === 'time') sorted = tools.sortTime(sorted);
    setLocations(sorted);
  };

  const handleSelection = (selected) => {
    locations.forEach((location) => {
      if (location._id.toString() === selected) {
        sessionStorage.setItem(store.SELECTED_LOCATION, location);
        // history push to Selection
      }
    });
  };

  const changeDate = (type) => {
    let newDate = dayjs(date);
    newDate =
      type === 'dec' ? newDate.subtract(1, 'day') : newDate.add(1, 'day');
    newDate = newDate.format(format);
    let newLocations = [...locations];
    tools.addAvailableTimes(newLocations, newDate);
    setLocations(newLocations);
    setDate(newDate);
  };

  return loading ? (
    <Loading />
  ) : showResults ? (
    <SearchResults
      locations={locations}
      sortBy={handleSortBy}
      date={date}
      changeDate={changeDate}
      select={handleSelection}
    />
  ) : (
    <SearchForm handleSubmit={handleSubmit} error={error} />
  );
};

export default Search;
