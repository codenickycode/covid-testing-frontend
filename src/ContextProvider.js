import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = React.createContext();
export const SearchContext = React.createContext();
export const UserContext = React.createContext();

export const ContextProvider = ({ children }) => {
  //? **************************************************** HEADER TITLE
  const [title, setTitle] = useState('COVID-19 Tests');

  //? **************************************************** ALL LOCATIONS
  const [locations, setLocations] = useState([]);
  const [fetchingLocations, setFetchingLocations] = useState(false);
  const getLocations = () => {
    setFetchingLocations(true);
    axios
      .get('http://localhost:8000/common/locations')
      .then((res) => {
        if (!zip) setLocations(res.data);
        sortDistance(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setFetchingLocations(false);
      });
  };

  //? **************************************************** ALL APPOINTMENTS
  const [appointments, setAppointments] = useState([]);
  const [fetchingAppointments, setFetchingAppointments] = useState(false);
  const getAppointments = () => {
    setFetchingAppointments(true);
    axios
      .get('http://localhost:8000/common/appointments/all')
      .then((res) => {
        setAppointments(res);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setFetchingAppointments(false);
      });
  };

  //? *************************************************** SEARCH PARAMS
  const [testFilter, setTestFilter] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [zip, setZip] = useState('');
  const [prevSort, setPrevSort] = useState({});
  const [fetchingSort, setFetchingSort] = useState(false);

  const filter = () => {
    if (Object.keys(testFilter).length === 0)
      return setFilteredLocations(locations);
    setFilteredLocations(
      locations.filter((location) => {
        for (let [test, val] of Object.entries(testFilter)) {
          if (testFilter[test] && location.tests.indexOf(test) === -1)
            return false;
        }
        return true;
      })
    );
  };

  const sortDistance = ([...array]) => {
    if (!zip || zip.match(/\D/g)) return;
    if (zip in prevSort) return setLocations(prevSort[zip]);
    setFetchingSort(true);
    let locationZips = '';
    for (let location of array) {
      locationZips += location.address.zip + '|';
    }
    axios
      .post(`http://localhost:8000/common/locations/distance`, {
        zip,
        locationZips,
        locations: array,
      })
      .then((res) => {
        res.data.sort((a, b) => a.distance - b.distance);
        setPrevSort({ ...prevSort, [zip]: res.data });
        setLocations(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setFetchingSort(false);
      });
  };

  //? **************************************************** USER CONTEXT

  // ******************************************* USE-EFFECTS:
  useEffect(() => {
    filter();
  }, [locations, testFilter]);

  useEffect(() => {
    console.log(locations, appointments);
  }, [locations, appointments]);

  return (
    <AppContext.Provider value={{ title, setTitle }}>
      <SearchContext.Provider
        value={{
          locations,
          setLocations,
          fetchingLocations,
          setFetchingLocations,
          getLocations,
          appointments,
          setAppointments,
          fetchingAppointments,
          setFetchingAppointments,
          getAppointments,
          testFilter,
          setTestFilter,
          filteredLocations,
          setFilteredLocations,
          zip,
          setZip,
          prevSort,
          setPrevSort,
          fetchingSort,
          setFetchingSort,
          filter,
          sortDistance,
        }}
      >
        <UserContext.Provider value={null}>{children}</UserContext.Provider>
      </SearchContext.Provider>
    </AppContext.Provider>
  );
};
