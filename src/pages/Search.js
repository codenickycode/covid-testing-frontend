import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import * as tools from './Search/tools/tools.js';
import useGetLocations from './Search/tools/useGetLocations.js';
import SearchForm from './Search/Form.js';
import SearchResults from './Search/Results.js';
import { DateContext, SelectedLocationContext } from '../ContextProvider.js';

const Loading = () => <h1>Loading...</h1>;

const Search = () => {
  const history = useHistory();
  const {
    storeLocations,
    storeDistances,
    filterLocationsBy,
  } = useGetLocations();
  const { setSelectedLocation } = useContext(SelectedLocationContext);
  const { format, date, setDate } = useContext(DateContext);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (tests, zip) => {
    setLoading(true);
    try {
      await storeLocations(date);
      await storeDistances(zip);
      const filtered = filterLocationsBy('tests', tests);
      const sorted = tools.sortDistance(filtered);
      setResults(sorted);
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
    let sorted = tools.sortDistance(results);
    if (type === 'time') sorted = tools.sortTime(sorted);
    setResults(sorted);
  };

  const handleSelection = (selected) => {
    results.forEach((location) => {
      if (location._id.toString() === selected) {
        setSelectedLocation(location);
        history.push('/selection');
      }
    });
  };

  const changeDate = (type) => {
    let newDate = dayjs(date);
    newDate =
      type === 'dec' ? newDate.subtract(1, 'day') : newDate.add(1, 'day');
    newDate = newDate.format(format);
    let newLocations = [...results];
    tools.addAvailableTimes(newLocations, newDate);
    setResults(newLocations);
    setDate(newDate);
  };

  return loading ? (
    <Loading />
  ) : showResults ? (
    <SearchResults
      locations={results}
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
