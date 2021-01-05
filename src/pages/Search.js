import React, { useState } from 'react';
import useSearchTools from './Search/tools/useSearchTools.js';
import SearchForm from './Search/Form.js';
import SearchResults from './Search/Results.js';

const Loading = () => <h1>Loading...</h1>;

const Search = () => {
  const tools = useSearchTools();

  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (tests, zip) => {
    setLoading(true);
    try {
      await tools.storeLocations();
      await tools.storeDistances(zip);
      tools.filterLocationsBy('tests', tests);
      tools.sortDistance();
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
    <SearchResults />
  ) : (
    <SearchForm handleSubmit={handleSubmit} error={error} />
  );
};

export default Search;
