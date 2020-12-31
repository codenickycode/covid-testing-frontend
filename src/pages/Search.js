import React, { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { TIMESLOTS } from '../constants.js';
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

  const handleSubmit = (tests, zip) => {
    getLocations(tests, zip);
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

  const getLocations = async (tests, zip) => {
    setState({ ...state, loading: true });
    try {
      const res = await axios.get(
        `http://localhost:8000/common/locations?zip=${zip}`
      );
      const allLocations = res.data;
      getAvailableTimes(allLocations, state.date);
      const filteredLocations = filterLocations(tests, allLocations);
      const sortedLocations = sortDistance(filteredLocations);
      setState({
        ...state,
        showResults: true,
        allLocations,
        locationsResults: sortedLocations,
        loading: false,
        error: '',
      });
    } catch (e) {
      console.log(e);
      setState({ ...state, loading: false, error: e.message });
    }
  };

  const getAvailableTimes = (locations, date) => {
    locations.forEach((location) => {
      location.available = [...TIMESLOTS];
      location.appointments.forEach((appointment) => {
        if (dayjs(appointment.date).isSame(dayjs(date), 'date')) {
          location.available.splice(
            location.available.indexOf(appointment.time),
            1
          );
        }
      });
    });
  };

  const filterLocations = (tests, locations) => {
    return locations.filter((location) => {
      location.tests.forEach((test, i) => {
        location.tests[i] = test.toLowerCase();
      });
      for (let [test] of Object.entries(tests)) {
        if (tests[test] && location.tests.indexOf(test) === -1) return false;
      }
      return true;
    });
  };

  const sortDistance = (unsorted) => {
    let locations = [...unsorted];
    return locations.sort((a, b) => a.distance - b.distance);
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
