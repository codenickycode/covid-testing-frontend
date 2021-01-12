import React, { useState, useEffect, useContext } from 'react';
import { getLS, setLS } from '../pages/Search/tools/tools.js';
import AccountContextProvider from './AccountContextProvider.js';

export const INIT_APP_CONTEXT = {
  loggedIn: false,
  updateAH: true,
  allLocations: [],
  searchResults: [],
  prevSearch: {},
  appointments: {},
  appointmentsLoaded: false,
  navDisabled: false,
};

export const GetAppContext = React.createContext();
export const SetAppContext = React.createContext();
const AppContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(getLS('loggedIn'));
  useEffect(() => {
    setLS('loggedIn', loggedIn);
  }, [loggedIn]);

  const [updateAH, setUpdateAH] = useState(getLS('updateAH'));
  useEffect(() => {
    setLS('updateAH', updateAH);
  }, [updateAH]);

  const [allLocations, setAllLocations] = useState(getLS('allLocations') || []);
  useEffect(() => {
    setLS('allLocations', allLocations);
  }, [allLocations]);

  const [searchResults, setSearchResults] = useState(
    getLS('searchResults') || []
  );
  useEffect(() => {
    setLS('searchResults', searchResults);
  }, [searchResults]);

  const [prevSearch, setPrevSearch] = useState(getLS('prevSearch') || {});
  useEffect(() => {
    setLS('prevSearch', prevSearch);
  }, [prevSearch]);

  const [appointments, setAppointments] = useState(getLS('appointments') || {});
  useEffect(() => {
    setLS('appointments', appointments);
  }, [appointments]);

  const [appointmentsLoaded, setAppointmentsLoaded] = useState(
    getLS('appointmentsLoaded')
  );
  useEffect(() => {
    setLS('appointmentsLoaded', appointmentsLoaded);
  }, [appointmentsLoaded]);

  const [navDisabled, setNavDisabled] = useState(getLS('navDisabled'));
  useEffect(() => {
    setLS('navDisabled', navDisabled);
  }, [navDisabled]);
  return (
    <SetAppContext.Provider
      value={{
        setLoggedIn,
        setUpdateAH,
        setAllLocations,
        setSearchResults,
        setPrevSearch,
        setAppointments,
        setAppointmentsLoaded,
        setNavDisabled,
      }}
    >
      <GetAppContext.Provider
        value={{
          loggedIn,
          updateAH,
          allLocations,
          searchResults,
          prevSearch,
          appointments,
          appointmentsLoaded,
          navDisabled,
        }}
      >
        {children}
      </GetAppContext.Provider>
    </SetAppContext.Provider>
  );
};

export const useSetAllAppContext = () => {
  const all = useContext(SetAppContext);
  const setAllAppContext = (value) => {
    all.setLoggedIn(value.loggedIn);
    all.setUpdateAH(value.updateAH);
    all.setAllLocations(value.allLocations);
    all.setSearchResults(value.searchResults);
    all.setPrevSearch(value.prevSearch);
    all.setAppointments(value.appointments);
    all.setAppointmentsLoaded(value.appointmentsLoaded);
    all.setNavDisabled(value.navDisabled);
  };
  return setAllAppContext;
};

const ContextProvider = ({ children }) => {
  return (
    <AppContextProvider>
      <AccountContextProvider>{children}</AccountContextProvider>
    </AppContextProvider>
  );
};

export default ContextProvider;
