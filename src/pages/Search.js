import React, { useState, useEffect, useContext } from 'react';
import * as tools from '../tools/tools.js';
import { useTryCatchFinally } from '../tools/useTryCatchFinally.js';
import { App, Info, SetInfo } from '../Providers/ContextProvider.js';
import SearchForm from './Search/SearchForm.js';
import SearchResults from './Search/SearchResults.js';
import Selection from './Search/Selection.js';

const Loading = () => <h1>Loading...</h1>;

const Search = () => {
  const { loading, error } = useContext(App);
  const { searchResults, prevSearch } = useContext(Info);
  const setInfo = useContext(SetInfo);
  const tryCatchFinally = useTryCatchFinally();

  const [date, setDate] = useState(tools.TODAY);
  const [showResults, setShowResults] = useState(false);
  const [showSelection, setShowSelection] = useState(false);
  const [selection, setSelection] = useState(null);

  const search = (...tryArgs) => {
    tryCatchFinally(tryFunc, tryArgs);
    async function tryFunc(tests, zip, date, sortBy = 'distance') {
      let locations = await tools.getLocations();
      locations = await tools.getDistances(zip, locations);
      let filtered = tools.filterLocationsBy('tests', tests, locations);
      tools.addAvailableTimes(filtered, date);
      tools.sortLocationsBy(sortBy, filtered);
      setInfo((prevState) => ({
        ...prevState,
        allLocations: locations,
        searchResults: filtered,
        prevSearch: { tests, zip, sortBy },
      }));
      setShowResults(true);
    }
  };

  const handleSortBy = (sortBy) => {
    let results = [...searchResults];
    tools.sortLocationsBy(sortBy, results);
    setInfo((prevState) => ({
      ...prevState,
      searchResults: results,
      prevSearch: { ...prevState.prevSearch, sortBy },
    }));
  };

  const handleChangeDate = (type) => {
    const newDate = tools.changeDate(type, date);
    let newResults = [...searchResults];
    tools.addAvailableTimes(newResults, newDate);
    tools.sortLocationsBy(prevSearch.sortBy, newResults);
    setInfo((prevState) => ({ ...prevState, searchResults: newResults }));
    setDate(newDate);
  };

  const handleSelection = (selected) => {
    const selectedLocation = tools.getSelection(selected, searchResults);
    setSelection(selectedLocation);
    setShowSelection(true);
  };

  const refreshLocations = (date) => {
    const { tests, zip, sortBy } = prevSearch;
    search(tests, zip, date, sortBy);
  };

  useEffect(() => {
    if (showSelection) handleSelection(selection._id);
  });

  return (
    <>
      {loading && <Loading />}
      {error && <h1>{error}</h1>}
      {showSelection ? (
        <Selection
          selection={selection}
          date={date}
          refreshLocations={refreshLocations}
          handleChangeDate={handleChangeDate}
        />
      ) : showResults ? (
        <SearchResults
          searchResults={searchResults}
          date={date}
          handleSortBy={handleSortBy}
          handleChangeDate={handleChangeDate}
          handleSelection={handleSelection}
        />
      ) : (
        <SearchForm handleSubmit={search} />
      )}
    </>
  );
};

export default Search;
