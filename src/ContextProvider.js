import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { TESTS, FILTER_INIT } from './constants';

export const AppContext = React.createContext();

const INITIAL_STATE = {
  title: 'COVID-19 Tests',
  tests: TESTS,
  testFilter: FILTER_INIT(),
  allLocations: [],
  searchLocations: [],
  zip: '',
  prevSort: {},
  fetching: false,
  error: '',
};

//? ******************************************* REDUCER ACTIONS:
const SET_ERROR = 'SET_ERROR';
const SET_ALL_LOCATIONS = 'SET_ALL_LOCATIONS';
const SET_SEARCH_LOCATIONS = 'SET_SEARCH_LOCATIONS';
const SET_SORTED_LOCATIONS = 'SET_SORTED_LOCATIONS';

//? ******************************************* COMPONENT:
export const ContextProvider = ({ children }) => {
  // ******************************************* STATE:
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [fetching, setFetching] = useState(false);

  // ******************************************* REDUCER:
  const reducer = (state, action) => {
    const { type, payload };
    switch (type) {
      case SET_ERROR:
        return { ...state, error: payload };
      case SET_ALL_LOCATIONS:
        return { ...state, allLocations: payload };
      case SET_SEARCH_LOCATIONS:
        return { ...state, searchLocations: payload };
      case SET_SORTED_LOCATIONS:
        return {
          ...state,
          searchLocations: payload.searchLocations,
          prevSort: payload.prevSort,
        };
      default:
        throw new Error('Invalid dispatch');
    }
  };

  // ******************************************* FUNCTIONS:
  const getLocations = async () => {
    setFetching(true);
    try {
      const res = await axios.get('http://localhost:8000/common/locations');
      dispatch({ type: SET_ALL_LOCATIONS, payload: res.data });
    } catch (e) {
      console.log(e);
      dispatch({ type: SET_ERROR, payload: e.message });
    } finally {
      setFetching(false);
    }
  };

  const sortDistance = async (
    allLocations = [...state.allLocations],
    searchLocations = [...state.searchLocations],
    zip = state.zip,
    prevSort = state.prevSort
  ) => {
    if (!zip || zip.match(/\D/g))
      return dispatch({ type: SET_SEARCH_LOCATIONS, payload: searchLocations });
    if (zip in prevSort)
      return dispatch({ type: SET_SEARCH_LOCATIONS, payload: prevSort[zip] });
    setFetching(true);
    let locationZips = '';
    for (let location of allLocations) {
      locationZips += location.address.zip + '|';
    }
    getDistances(zip, locationsZips, allLocations);
  };

  const getDistances = async (zip, locationZips, allLocations) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/common/locations/distance`,
        {
          zip,
          locationZips,
          allLocations,
        }
      );
      res.data.sort((a, b) => a.distance - b.distance);
      const updatedPrevSort = { ...state.prevSort, [zip]: res.data };
      dispatch({
        type: SET_SORTED_LOCATIONS,
        payload: { searchLocations: res.data, prevSort: updatedPrevSort },
      });
    } catch (e) {
      console.log(e);
      dispatch({ type: SET_ERROR, payload: e.message });
    } finally {
      setFetching(false);
    }
  };

  const filter = (testFilter) => {
    const searchLocations =
      Object.keys(testFilter).length === 0
        ? state.allLocations
        : locations.filter((location) => {
            for (let [test, val] of Object.entries(testFilter)) {
              if (testFilter[test] && location.tests.indexOf(test) === -1)
                return false;
            }
            return true;
          });
    dispatch({ type: SET_SEARCH_LOCATIONS, searchLocations });
  };

  // ******************************************* USE-EFFECTS:
  useEffect(() => {
    filter(state.testFilter);
  }, [state.allLocations, state.testFilter]);

  useEffect(() => {
    sortDistance();
  }, [state.allLocations, state.zip]);

  // ******************************************* RETURN:
  return (
    <AppContext.Provider
      value={{ reducer, state, dispatch, getLocations, sortDistance, fetching }}
    >
      {children}
    </AppContext.Provider>
  );
};
