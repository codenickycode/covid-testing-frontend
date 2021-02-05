import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { DARK_THEME, LIGHT_THEME } from '../tools/themes.js';
import { getLS, setLS, getSS, setSS } from '../tools/storage';

export const INIT_APP = {
  loading: false,
  navDisabled: false,
  error: '',
  confirmation: '',
  allLocations: [],
  searchResults: [],
  prevSearch: {},
  appointment: null,
  settings: {
    dark: getLS('dark') || false,
    remember: getLS('remember') || false,
  },
  user: null,
  headerName: '',
};

export const App = React.createContext();
export const SetApp = React.createContext();
const ContextProvider = ({ children }) => {
  const [app, setApp] = useState(getSS('app') || INIT_APP);

  useEffect(() => {
    setSS('app', app);
  }, [app]);

  let alertTimer = useRef(null);
  useEffect(() => {
    if (app.confirmation || app.error) {
      clearTimeout(alertTimer.current);
      alertTimer.current = setTimeout(
        () => setApp((prev) => ({ ...prev, confirmation: '', error: '' })),
        3000
      );
    }
    return () => clearTimeout(alertTimer.current);
  }, [app.confirmation, app.error]);

  // update AccountHeader name
  useEffect(() => {
    if (app.user && app.user.name.firstName !== app.headerName) {
      setApp((prev) => ({ ...prev, headerName: app.user.name.firstName }));
    }
  }, [app]);

  // update storage & change theme
  useEffect(() => {
    if (app.user) {
      const { remember, dark } = app.user.preferences;
      setLS('dark', !remember ? false : dark);
      setLS('remember', remember);
      const style = document.querySelector(':root').style;
      style.cssText += ';' + (dark ? DARK_THEME : LIGHT_THEME);
    }
  }, [app.user]);

  // 2s delay while user toggles before updating server
  let settingsTimer = useRef(null);
  useEffect(() => {
    if (app.settingsUpdated) {
      setApp((prev) => ({ ...prev, loading: true }));
      clearTimeout(settingsTimer.current);
      settingsTimer.current = setTimeout(updateDB, 2000);
    }
    async function updateDB() {
      let newPrevious = app.settings;
      let newUpdated = true;
      let error = '';
      for (let key of Object.keys(app.user.preferences)) {
        if (app.user.preferences[key] !== app.settings[key]) {
          try {
            await axios.post(
              '/common/update/preferences',
              app.user.preferences
            );
            newPrevious = app.user.preferences;
            newUpdated = false;
          } catch (e) {
            error = e.response?.data || e.message;
          }
          break;
        }
      }
      setApp((prev) => ({
        ...prev,
        settings: newPrevious,
        settingsUpdated: newUpdated,
        loading: false,
        error,
      }));
    }
    return () => {
      clearTimeout(settingsTimer.current);
      setApp((prev) => ({ ...prev, loading: false }));
    };
  }, [app.settingsUpdated, app.settings, app.user]);

  return (
    <SetApp.Provider value={setApp}>
      <App.Provider value={app}>{children}</App.Provider>
    </SetApp.Provider>
  );
};

export default ContextProvider;
