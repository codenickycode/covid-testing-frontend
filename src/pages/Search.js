import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm.js';
import SearchResults from './SearchResults.js';

const Loading = () => <h1>Loading...</h1>;

const INITIAL_STATE = {
  showResults: false,
  filteredLocations: [],
  loading: false,
  error: '',
};

const Search = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const handleSubmit = (tests, zip) => {
    getLocations(tests, zip);
  };

  const getLocations = async (tests, zip) => {
    setState({ ...state, loading: true });
    try {
      const res = await axios.get(
        `http://localhost:8000/common/locations?zip=${zip}`
      );
      const locations = res.data;
      const filteredLocations = filterLocations(tests, locations);
      setState({
        showResults: true,
        filteredLocations,
        loading: false,
        error: '',
      });
    } catch (e) {
      console.log(e);
      setState({ ...state, loading: false, error: e.message });
    }
  };

  const filterLocations = (tests, locations) => {
    return locations.filter((location) => {
      location.tests.forEach((test, i) => {
        location.tests[i] = test.toLowerCase();
      });
      for (let [test] of Object.entries(tests)) {
        console.log(test);
        console.log(location.tests);
        if (tests[test] && location.tests.indexOf(test) === -1) return false;
      }
      return true;
    });
  };

  return state.loading ? (
    <Loading />
  ) : state.showResults ? (
    <SearchResults locations={state.filteredLocations} />
  ) : (
    <SearchForm handleSubmit={handleSubmit} error={state.error} />
  );
};

export default Search;
