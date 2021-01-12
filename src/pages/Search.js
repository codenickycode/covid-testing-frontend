import React, { useState, useEffect, useContext } from 'react';
import * as tools from '../tools/tools.js';
import { useTryCatchFinally } from '../tools/useTryCatchFinally.js';
import { useContextTools } from '../tools/useContextTools.js';
import { GetAppContext } from '../Providers/AppContextProvider.js';
import SearchForm from './Search/SearchForm.js';
import SearchResults from './Search/SearchResults.js';
import Selection from './Search/Selection.js';

const Loading = () => <h1>Loading...</h1>;

const Search = () => {
  const { loading, error } = useContext(GetAppContext);
  const tryCatchFinally = useTryCatchFinally();
  const contextTools = useContextTools();

  const [date, setDate] = useState(tools.TODAY);
  const [showResults, setShowResults] = useState(false);
  const [prevSearch, setPrevSearch] = useState({ zip: '', tests: '' });
  const [showSelection, setShowSelection] = useState(false);
  const [selection, setSelection] = useState(null);

  const fetchAllLocations = (tests, zip, date) => {
    const tryFunc = async (tests, zip, date) => {
      await contextTools.getLocations();
      await contextTools.getDistances(zip);
      contextTools.filterLocationsBy('tests', tests);
      contextTools.sortResultsBy('distance');
      contextTools.refreshAvailable(date);
      setShowResults(true);
      setPrevSearch({ tests, zip });
    };
    const tryArgs = [tests, zip, date];
    tryCatchFinally(tryFunc, tryArgs);
  };

  const handleChangeDate = (type) => {
    const newDate = tools.changeDate(type, date);
    contextTools.refreshAvailable(newDate);
    setDate(newDate);
  };

  const handleSelection = (selected) => {
    const selectedLocation = contextTools.getSelection(selected);
    setSelection(selectedLocation);
    setShowSelection(true);
  };

  const refreshLocations = (date) => {
    const { tests, zip } = prevSearch;
    fetchAllLocations(tests, zip, date);
  };

  useEffect(() => {
    if (showSelection) handleSelection(selection._id);
  });

  return loading ? (
    <Loading />
  ) : error ? (
    <h1>{error}</h1>
  ) : showSelection ? (
    <Selection
      selection={selection}
      date={date}
      refreshLocations={refreshLocations}
      handleChangeDate={handleChangeDate}
    />
  ) : showResults ? (
    <SearchResults
      date={date}
      handleChangeDate={handleChangeDate}
      handleSelection={handleSelection}
    />
  ) : (
    <SearchForm handleSubmit={fetchAllLocations} />
  );
};

export default Search;
