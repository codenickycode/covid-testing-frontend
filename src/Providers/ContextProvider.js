import React, { useState, useEffect } from 'react';
import { getLS, setLS } from '../tools/tools.js';
import AccountProvider from './AccountProvider.js';

export const INIT_APP_STATE = {
  loading: false,
  error: '',
  loggedIn: false,
  title: '',
};

export const INIT_INFO_STATE = {
  allLocations: [],
  searchResults: [],
  prevSearch: {},
  appointment: null,
  confirmation: '',
};

export const NavDisabled = React.createContext();
export const SetNavDisabled = React.createContext();
const NavDisabledProvider = ({ children }) => {
  const [navDisabled, setNavDisabled] = useState(getLS('navDisabled') || false);

  useEffect(() => {
    setLS('navDisabled', navDisabled);
  }, [navDisabled]);

  return (
    <SetNavDisabled.Provider value={setNavDisabled}>
      <NavDisabled.Provider value={navDisabled}>
        {children}
      </NavDisabled.Provider>
    </SetNavDisabled.Provider>
  );
};

export const App = React.createContext();
export const SetApp = React.createContext();
const AppProvider = ({ children }) => {
  const [app, setApp] = useState(getLS('app') || INIT_APP_STATE);

  useEffect(() => {
    setLS('loading', app.loading);
    setLS('error', app.error);
    setLS('loggedIn', app.loggedIn);
    setLS('title', app.title);
  }, [app]);

  return (
    <SetApp.Provider value={setApp}>
      <App.Provider value={app}>{children}</App.Provider>
    </SetApp.Provider>
  );
};

export const Info = React.createContext();
export const SetInfo = React.createContext();
const InfoProvider = ({ children }) => {
  const [info, setInfo] = useState(getLS('info') || INIT_INFO_STATE);

  useEffect(() => {
    setLS('allLocations', info.allLocations);
    setLS('searchResults', info.searchResults);
    setLS('prevSearch', info.prevSearch);
    setLS('appointment', info.appointment);
    setLS('confirmation', info.confirmation);
  }, [info]);

  return (
    <SetInfo.Provider value={setInfo}>
      <Info.Provider value={info}>{children}</Info.Provider>
    </SetInfo.Provider>
  );
};

const ContextProvider = ({ children }) => {
  return (
    <AppProvider>
      <InfoProvider>
        <AccountProvider>
          <NavDisabledProvider>{children}</NavDisabledProvider>
        </AccountProvider>
      </InfoProvider>
    </AppProvider>
  );
};

export default ContextProvider;
