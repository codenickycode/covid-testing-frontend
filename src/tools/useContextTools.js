import { useRef, useContext } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  GetAppContext,
  SetAppContext,
} from '../Providers/AppContextProvider.js';
import * as tools from './tools.js';

// export const useLoading = () => {
//   const { loading } = useContext(GetAppContext);
//   const { setLoading } = useContext(SetAppContext);
//   return { loading, setLoading };
// };

// export const useError = () => {
//   const { error } = useContext(GetAppContext);
//   const { setError } = useContext(SetAppContext);
//   return { error, setError };
// };

export const useContextTools = () => {
  const allLocationsRef = useRef();
  const searchResultsRef = useRef();

  const { allLocations, searchResults } = useContext(GetAppContext);
  const { setAllLocations, setSearchResults } = useContext(SetAppContext);

  const getLocations = async () => {
    const res = await axios.get('/common/locations');
    allLocationsRef.current = res.data;
    setAllLocations(res.data);
  };

  const getDistances = async (zip) => {
    const locationsZips = tools.parseLocationsZips(allLocationsRef.current);
    const res = await axios.post('/common/distances', {
      zip,
      locationsZips,
      locations: allLocationsRef.current,
    });
    allLocationsRef.current = res.data;
    setAllLocations(res.data);
  };

  const filterLocationsBy = (type, filter) => {
    if (!filter) {
      searchResultsRef.current = allLocationsRef.current;
      setSearchResults(allLocationsRef.current);
    }
    if (type === 'tests') {
      const tests = filter;
      let filteredLocations = allLocationsRef.current.filter((location) => {
        for (let [test] of Object.entries(tests)) {
          if (tests[test] && location.tests.indexOf(test) === -1) return false;
        }
        return true;
      });
      tools.addAvailableTimes(filteredLocations);
      searchResultsRef.current = filteredLocations;
      setSearchResults(filteredLocations);
    }
  };

  const sortResultsBy = (type) => {
    sortResultsByDistance();
    if (type === 'time') sortResultsByTime();
  };

  const sortResultsByDistance = () => {
    let results = searchResultsRef.current
      ? [...searchResultsRef.current]
      : [...searchResults];
    results.sort((a, b) => a.distance - b.distance);
    searchResultsRef.current = results;
    setSearchResults(results);
  };

  const sortResultsByTime = () => {
    let results = searchResultsRef.current
      ? [...searchResultsRef.current]
      : [...searchResults];
    results.sort((a, b) => {
      let aDate = dayjs(`2000-01-01 ${a.available[0]}`);
      let bDate = dayjs(`2000-01-01 ${b.available[0]}`);
      return aDate.diff(bDate);
    });
    searchResultsRef.current = results;
    setSearchResults(results);
  };

  const refreshAvailable = (date) => {
    let results = searchResultsRef.current
      ? [...searchResultsRef.current]
      : [...searchResults];
    tools.addAvailableTimes(results, date);
    searchResultsRef.current = results;
    setSearchResults(results);
  };

  const getSelection = (selected) => {
    let results = searchResultsRef.current
      ? [...searchResultsRef.current]
      : [...searchResults];
    let selection = null;
    results.forEach((location) => {
      if (location._id.toString() === selected) selection = location;
    });
    return selection;
  };

  return {
    getLocations,
    getDistances,
    filterLocationsBy,
    sortResultsBy,
    refreshAvailable,
    getSelection,
  };
};
