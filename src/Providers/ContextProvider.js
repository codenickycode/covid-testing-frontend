import React, { useState, useEffect, useContext } from 'react';
import { getSS, setSS } from '../tools/tools.js';
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

export const Refresh = React.createContext();
export const SetRefresh = React.createContext();
const RefreshProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(true);
  return (
    <SetRefresh.Provider value={setRefresh}>
      <Refresh.Provider value={refresh}>{children}</Refresh.Provider>
    </SetRefresh.Provider>
  );
};

export const App = React.createContext();
export const SetApp = React.createContext();
const AppProvider = ({ children }) => {
  const [app, setApp] = useState(getSS('app') || INIT_APP_STATE);
  useEffect(() => {
    setSS('app', app);
  }, [app]);
  return (
    <SetApp.Provider value={setApp}>
      <App.Provider value={app}>{children}</App.Provider>
    </SetApp.Provider>
  );
};

export const NavDisabled = React.createContext();
export const SetNavDisabled = React.createContext();
const NavDisabledProvider = ({ children }) => {
  const { loading } = useContext(App);
  const [navDisabled, setNavDisabled] = useState(getSS('navDisabled') || false);
  useEffect(() => {
    setSS('navDisabled', navDisabled);
  }, [navDisabled]);
  useEffect(() => {
    setNavDisabled(loading);
  }, [loading]);
  return (
    <SetNavDisabled.Provider value={setNavDisabled}>
      <NavDisabled.Provider value={navDisabled}>
        {children}
      </NavDisabled.Provider>
    </SetNavDisabled.Provider>
  );
};

export const Info = React.createContext();
export const SetInfo = React.createContext();
const InfoProvider = ({ children }) => {
  const [info, setInfo] = useState(getSS('info') || INIT_INFO_STATE);
  useEffect(() => {
    setSS('info', info);
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
          <NavDisabledProvider>
            <RefreshProvider>{children}</RefreshProvider>
          </NavDisabledProvider>
        </AccountProvider>
      </InfoProvider>
    </AppProvider>
  );
};

export default ContextProvider;
