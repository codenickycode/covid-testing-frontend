import React, { useState, useEffect } from 'react';
import * as tools from './Search/tools/tools.js';
import SearchForm from './Search/SearchForm.js';
import SearchResults from './Search/SearchResults.js';
import Selection from './Search/Selection.js';

const Loading = () => <h1>Loading...</h1>;

const Search = () => {
  const [date, setDate] = useState(tools.TODAY);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showSelection, setShowSelection] = useState(false);
  const [selection, setSelection] = useState(null);
  const [error, setError] = useState('');

  const fetchAllLocations = async (tests, zip, date) => {
    try {
      setLoading(true);
      let locations = await tools.getLocations();
      locations = await tools.getDistances(zip, locations);
      let filtered = tools.filterLocationsBy('tests', tests, locations);
      tools.sortByDistance(filtered);
      filtered = refreshAvailable(filtered, date);
      setResults(filtered);
      setShowResults(true);
      setError('');
    } catch (e) {
      const error = e.response != null ? e.response.data : e.message;
      setError(error);
    } finally {
      setLoading(false);
      sessionStorage.setItem('prevSearch', JSON.stringify({ tests, zip }));
    }
  };

  const handleSortBy = (type) => {
    let newResults = [...results];
    tools.sortByDistance(newResults);
    if (type === 'time') tools.sortByTime(newResults);
    setResults(newResults);
  };

  const handleChangeDate = (type) => {
    let newDate = tools.changeDate(type, date);
    const newResults = refreshAvailable(results, newDate);
    setDate(newDate);
    setResults(newResults);
  };

  const handleSelection = (selected) => {
    const selectedLocation = tools.getSelection(selected, results);
    setSelection(selectedLocation);
    setShowSelection(true);
  };

  const refreshLocations = (date) => {
    const { tests, zip } = JSON.parse(sessionStorage.getItem('prevSearch'));
    fetchAllLocations(tests, zip, date);
  };

  const refreshAvailable = (locations, date) => {
    let newLocations = [...locations];
    tools.addAvailableTimes(newLocations, date);
    return newLocations;
  };

  useEffect(() => {
    if (showSelection) handleSelection(selection._id);
  });

  return loading ? (
    <Loading />
  ) : showSelection ? (
    <Selection
      selection={selection}
      date={date}
      handleChangeDate={handleChangeDate}
      refreshLocations={refreshLocations}
    />
  ) : showResults ? (
    <SearchResults
      date={date}
      results={results}
      handleChangeDate={handleChangeDate}
      handleSortBy={handleSortBy}
      handleSelection={handleSelection}
    />
  ) : (
    <SearchForm handleSubmit={fetchAllLocations} error={error} />
  );
};

export default Search;
