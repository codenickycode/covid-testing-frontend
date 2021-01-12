import React, { useState, useEffect, useContext } from 'react';
import * as tools from './Search/tools/tools.js';
import {
  GetAppContext,
  SetAppContext,
} from '../Providers/AppContextProvider.js';
import SearchForm from './Search/SearchForm.js';
import SearchResults from './Search/SearchResults.js';
import Selection from './Search/Selection.js';

const Loading = () => <h1>Loading...</h1>;

const Search = () => {
  const { prevSearch, searchResults } = useContext(GetAppContext);
  const {
    setAllLocations,
    setSearchResults,
    setPrevSearch,
    setNavDisabled,
  } = useContext(SetAppContext);

  const [date, setDate] = useState(tools.TODAY);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showSelection, setShowSelection] = useState(false);
  const [selection, setSelection] = useState(null);
  const [error, setError] = useState('');

  const fetchAllLocations = async (tests, zip, date) => {
    try {
      setLoading(true);
      setNavDisabled(true);
      let locations = await tools.getLocations();
      locations = await tools.getDistances(zip, locations);
      setAllLocations(locations);
      let filtered = tools.filterLocationsBy('tests', tests, locations);
      tools.sortByDistance(filtered);
      filtered = refreshAvailable(filtered, date);
      setSearchResults(filtered);
      setShowResults(true);
      setError('');
    } catch (e) {
      const error = e.response != null ? e.response.data : e.message;
      setError(error);
    } finally {
      setLoading(false);
      setNavDisabled(false);
      setPrevSearch({ tests, zip });
    }
  };

  const handleSortBy = (type) => {
    let newResults = [...searchResults];
    tools.sortByDistance(newResults);
    if (type === 'time') tools.sortByTime(newResults);
    setSearchResults(newResults);
  };

  const handleChangeDate = (type) => {
    let newDate = tools.changeDate(type, date);
    const newResults = refreshAvailable(searchResults, newDate);
    setDate(newDate);
    setSearchResults(newResults);
  };

  const handleSelection = (selected) => {
    const selectedLocation = tools.getSelection(selected, searchResults);
    setSelection(selectedLocation);
    setShowSelection(true);
  };

  const refreshLocations = (date) => {
    const { tests, zip } = prevSearch;
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
      results={searchResults}
      handleChangeDate={handleChangeDate}
      handleSortBy={handleSortBy}
      handleSelection={handleSelection}
    />
  ) : (
    <SearchForm handleSubmit={fetchAllLocations} error={error} />
  );
};

export default Search;
