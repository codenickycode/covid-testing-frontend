import React, { useState, useEffect, useContext } from 'react';
import { getLS, setLS, getSS, setSS, useStorage } from '../tools/tools.js';
import AccountProvider from './AccountProvider.js';

export const INIT_APP_STATE = {
  loading: false,
  error: '',
  loggedIn: false,
  title: '',
  dark: false,
};

export const INIT_INFO_STATE = {
  allLocations: [],
  searchResults: [],
  prevSearch: {},
  appointment: null,
  confirmation: '',
};

export const Remember = React.createContext();
export const SetRemember = React.createContext();
const RememberProvider = ({ children }) => {
  const [remember, setRemember] = useState(false);
  return (
    <SetRemember.Provider value={setRemember}>
      <Remember.Provider value={remember}>{children}</Remember.Provider>
    </SetRemember.Provider>
  );
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

export const NavDisabled = React.createContext();
export const SetNavDisabled = React.createContext();
const NavDisabledProvider = ({ children }) => {
  const { getStorage, setStorage } = useStorage();
  const [navDisabled, setNavDisabled] = useState(
    getStorage('navDisabled') || false
  );

  useEffect(() => {
    setStorage('navDisabled', navDisabled);
  }, [navDisabled, setStorage]);

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
  const { getStorage, setStorage } = useStorage();
  const [app, setApp] = useState(getStorage('app') || INIT_APP_STATE);
  useEffect(() => {
    console.log(getStorage('app'));

    setStorage('app', app);
  }, [app, getStorage, setStorage]);

  return (
    <SetApp.Provider value={setApp}>
      <App.Provider value={app}>{children}</App.Provider>
    </SetApp.Provider>
  );
};

export const Info = React.createContext();
export const SetInfo = React.createContext();
const InfoProvider = ({ children }) => {
  const { getStorage, setStorage } = useStorage();
  const [info, setInfo] = useState(getStorage('info') || INIT_INFO_STATE);

  useEffect(() => {
    setStorage('info', info);
  }, [info, setStorage]);

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
            <RefreshProvider>
              <RememberProvider>{children}</RememberProvider>
            </RefreshProvider>
          </NavDisabledProvider>
        </AccountProvider>
      </InfoProvider>
    </AppProvider>
  );
};

export default ContextProvider;
