import React, { useState, useEffect, useContext, useRef } from 'react';
import { getSS, setSS } from '../tools/storage';
import AccountProvider from './Account';
import PreferencesProvider from './Preferences';

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

  const [timer, setTimer] = useState(0);
  let interval = useRef(null);

  useEffect(() => {
    clearInterval(interval.current);
    setTimer(0);
    if (app.confirmation || app.error) {
      interval.current = setInterval(
        () => setTimer((prevTime) => prevTime + 1),
        1000
      );
    }
  }, [app.confirmation, app.error]);

  useEffect(() => {
    if (timer === 3) {
      clearInterval(interval.current);
      setTimer(0);
      setApp((prevState) => ({ ...prevState, confirmation: '', error: '' }));
    }
  }, [timer]);

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
    <AccountProvider>
      <PreferencesProvider>
        <AppProvider>
          <InfoProvider>
            <NavDisabledProvider>
              <RefreshProvider>{children}</RefreshProvider>
            </NavDisabledProvider>
          </InfoProvider>
        </AppProvider>
      </PreferencesProvider>
    </AccountProvider>
  );
};

export default ContextProvider;
