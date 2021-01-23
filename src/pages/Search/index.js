import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import tools from '../../tools/index.js';
import { App, SetApp } from '../../Providers/Context.js';
import SearchForm from './Form.js';
import SearchResults from './Results.js';
import Selection from './Selection.js';

const Search = () => {
  const history = useHistory();
  const { url } = useRouteMatch();

  const { error, searchResults, prevSearch } = useContext(App);
  const setApp = useContext(SetApp);

  const [date, setDate] = useState(tools.TODAY);
  const [selection, setSelection] = useState(null);

  const search = async (tests, zip, date, sortBy = 'distance') => {
    let error = '',
      newSearch = {};
    try {
      setApp((prev) => ({ ...prev, loading: true }));
      let locations = await tools.getLocations();
      locations = await tools.getDistances(zip, locations);
      let filtered = tools.filterLocationsBy('tests', tests, locations);
      tools.addAvailableTimes(filtered, date);
      tools.sortLocationsBy(sortBy, filtered);
      newSearch = {
        allLocations: locations,
        searchResults: filtered,
        prevSearch: { tests, zip, sortBy },
      };
    } catch (e) {
      console.log(e);
      error = e.response?.data || e.message;
    } finally {
      setApp((prev) => ({
        ...prev,
        ...newSearch,
        loading: false,
        error,
      }));
    }
  };

  const handleSubmit = (tests, zip) => {
    history.push(`${url}/results`);
    search(tests, zip);
  };

  const handleSortBy = (sortBy) => {
    let results = [...searchResults];
    tools.sortLocationsBy(sortBy, results);
    setApp((prev) => ({
      ...prev,
      searchResults: results,
      prevSearch: { ...prev.prevSearch, sortBy },
    }));
  };

  const handleChangeDate = (type) => {
    const newDate = tools.changeDate(type, date);
    let newResults = [...searchResults];
    tools.addAvailableTimes(newResults, newDate);
    tools.sortLocationsBy(prevSearch.sortBy, newResults);
    setApp((prev) => ({ ...prev, searchResults: newResults }));
    setDate(newDate);
  };

  const getSelected = useCallback(
    (selected) => {
      const selectedLocation = tools.getSelection(selected, searchResults);
      setSelection(selectedLocation);
    },
    [searchResults]
  );

  const handleSelection = (selected) => {
    history.push(`${url}/selection`);
    getSelected(selected);
  };

  const refreshLocations = (date) => {
    const { tests, zip, sortBy } = prevSearch;
    search(tests, zip, date, sortBy);
  };

  useEffect(() => {
    if (selection) getSelected(selection._id);
  }, [selection, getSelected]);

  return (
    <>
      {error && <h1 className='error'>{error}</h1>}
      <Route path={`${url}/form`}>
        <SearchForm handleSubmit={handleSubmit} />
      </Route>
      <Route path={`${url}/results`}>
        <SearchResults
          searchResults={searchResults}
          date={date}
          handleSortBy={handleSortBy}
          handleChangeDate={handleChangeDate}
          handleSelection={handleSelection}
        />
      </Route>

      <Route path={`${url}/selection`}>
        <Selection
          selection={selection}
          date={date}
          refreshLocations={refreshLocations}
          handleChangeDate={handleChangeDate}
        />
      </Route>
    </>
  );
};

export default Search;
