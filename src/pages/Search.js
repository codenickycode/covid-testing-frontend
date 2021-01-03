import React, { useState } from 'react';
import dayjs from 'dayjs';
import * as tools from './searchTools.js';
import * as store from './storeLocations.js';
import SearchForm from './SearchForm.js';
import SearchResults from './SearchResults.js';
import LocationSelection from './components/LocationSelection.js';

const Loading = () => <h1>Loading...</h1>;

const format = 'MMMM D, YYYY';
const today = dayjs().format(format);

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showSelection, setShowSelection] = useState(false);
  const [error, setError] = useState('');
  const [date, setDate] = useState(today);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSubmit = async (tests, zip) => {
    setLoading(true);
    try {
      await store.storeLocations(date);
      await store.storeDistances(zip);
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
        setSelectedLocation(location);
        setShowSelection(true);
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
  ) : showSelection ? (
    <LocationSelection location={selectedLocation} date={date} />
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
