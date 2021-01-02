import React, { useState } from 'react';
import dayjs from 'dayjs';
import {
  getAvailableTimes,
  sortDistance,
  filterLocations,
} from './searchTools.js';
import { getLocations, getDistances } from './reqs.js';
import SearchForm from './SearchForm.js';
import SearchResults from './SearchResults.js';
import LocationSelection from './components/LocationSelection.js';

const Loading = () => <h1>Loading...</h1>;

const format = 'MMMM D, YYYY';
const today = dayjs().format(format);

const INITIAL_STATE = {
  showResults: false,
  showSelection: false,
  allLocations: [],
  locationsResults: [],
  selectedLocation: '',
  date: today,
  loading: false,
  error: '',
};

const Search = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const handleSubmit = async (tests, zip) => {
    setState({ ...state, loading: true });
    try {
      const allLocations = await getLocations(state.date);
      const allLocationsPlusDistances = await getDistances(zip, allLocations);
      const filteredLocations = filterLocations(
        tests,
        allLocationsPlusDistances
      );
      const sortedLocations = sortDistance(filteredLocations);
      setState({
        ...state,
        showResults: true,
        allLocations: allLocationsPlusDistances,
        locationsResults: sortedLocations,
        loading: false,
        error: '',
      });
    } catch (e) {
      const error = e.response != null ? e.response.data : e.message;
      console.log(error);
      setState({ ...state, loading: false, error });
    }
  };

  const handleSortBy = (type) => {
    let locationsResults = [...state.locationsResults];
    locationsResults = sortDistance(locationsResults);
    if (type === 'time') {
      locationsResults.sort((a, b) => {
        let aDate = dayjs(`2000-01-01 ${a.available[0]}`);
        let bDate = dayjs(`2000-01-01 ${b.available[0]}`);
        return aDate.diff(bDate);
      });
    }
    setState({ ...state, locationsResults });
  };

  const handleSelection = (selected) => {
    let selectedLocation = null;
    state.locationsResults.forEach((location) => {
      if (location._id.toString() === selected) {
        selectedLocation = location;
      }
    });
    setState({ ...state, showSelection: true, selectedLocation });
  };

  const changeDate = (type) => {
    let locationsResults = [...state.locationsResults];
    let date = dayjs(state.date);
    if (type === 'dec') {
      date = date.subtract(1, 'day').format(format);
    } else {
      date = date.add(1, 'day').format(format);
    }
    getAvailableTimes(locationsResults, date);
    setState({ ...state, locationsResults, date });
  };

  return state.loading ? (
    <Loading />
  ) : state.showSelection ? (
    <LocationSelection location={state.selectedLocation} date={state.date} />
  ) : state.showResults ? (
    <SearchResults
      locations={state.locationsResults}
      sortBy={handleSortBy}
      date={state.date}
      changeDate={changeDate}
      select={handleSelection}
    />
  ) : (
    <SearchForm handleSubmit={handleSubmit} error={state.error} />
  );
};

export default Search;
