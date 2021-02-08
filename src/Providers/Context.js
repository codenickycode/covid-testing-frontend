import React, { useState, useEffect } from 'react';
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

  // copy app state to sessionStorage
  useEffect(() => {
    setSS('app', app);
  }, [app]);

  // alerts
  useEffect(() => {
    let timer = null;
    if (app.confirmation || app.error) {
      timer = setTimeout(
        () => setApp((prev) => ({ ...prev, confirmation: '', error: '' })),
        10000
      );
    }
    return () => clearTimeout(timer);
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
  useEffect(() => {
    let timer = null;
    if (app.settingsUpdated) {
      setApp((prev) => ({ ...prev, loading: true }));
      clearTimeout(timer);
      timer = setTimeout(() => updateDB(app.user, app.settings, setApp), 2000);
    }
    return () => {
      clearTimeout(timer);
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

// app.user.preferences updated before this
async function updateDB(user, settings, setApp) {
  let newSettings = { ...settings };
  let newUpdated = true;
  let error = '';
  for (let key of Object.keys(user.preferences)) {
    if (user.preferences[key] !== settings[key]) {
      try {
        await axios.post('/common/update/preferences', user.preferences);
        newSettings = user.preferences;
        newUpdated = false;
      } catch (e) {
        error = e.response?.data || e.message;
      }
      break;
    }
  }
  setApp((prev) => ({
    ...prev,
    settings: newSettings,
    settingsUpdated: newUpdated,
    loading: false,
    error,
  }));
}
