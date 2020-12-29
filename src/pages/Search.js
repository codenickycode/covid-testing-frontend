import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FILTER_INIT } from '../constants.js';
import SearchForm from './SearchForm.js';
import SearchResults from './SearchResults.js';

const Loading = () => <h1>Loading...</h1>;

const Search = () => {
  const [showResults, setShowResults] = useState(false);
  const [search, setSearch] = useState({ tests: FILTER_INIT, zip: 11572 });
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [error, setError] = useState('');

  // get all locations
  useEffect(() => {
    const getLocations = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8000/common/locations?zip=${search.zip}`
        );
        setLocations(res.data);
      } catch (e) {
        console.log(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    search && getLocations();
  }, [search]);

  // filter locations by test type
  useEffect(() => {
    const filterLocations = () => {
      const tempFilteredLocations =
        Object.keys(search.tests).length === 0
          ? locations
          : locations.filter((location) => {
              for (let [test] of Object.entries(search.tests)) {
                if (search.tests[test] && location.tests.indexOf(test) === -1)
                  return false;
              }
              return true;
            });
      setFilteredLocations(tempFilteredLocations);
      setShowResults(true);
    };
    locations && filterLocations();
  }, [locations]);

  return loading ? (
    <Loading />
  ) : showResults || error ? (
    <SearchResults locations={filteredLocations} />
  ) : (
    <SearchForm setSearch={setSearch} error={error} />
  );
};

export default Search;
