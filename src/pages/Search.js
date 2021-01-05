import React, { useState } from 'react';
import * as tools from './Search/tools/tools.js';
import SearchForm from './Search/Form.js';
import SearchResults from './Search/Results.js';

const Loading = () => <h1>Loading...</h1>;

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [allLocations, setAllLocations] = useState([]);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (tests, zip) => {
    try {
      setLoading(true);
      let locations =
        allLocations.length > 0 ? allLocations : await tools.getLocations();
      locations = tools.getDistances(zip, locations);
      let filtered = tools.filterLocationsBy('tests', tests, locations);
      tools.sortByDistance(filtered);
      setAllLocations(locations);
      setResults(filtered);
      setShowResults(true);
      setError('');
    } catch (e) {
      const error = e.response != null ? e.response.data : e.message;
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : showResults ? (
    <SearchResults results={results} />
  ) : (
    <SearchForm handleSubmit={handleSubmit} error={error} />
  );
};

export default Search;
