import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { DARK_THEME, LIGHT_THEME } from '../tools/themes.js';
import { getLS, getSS, setSS } from '../tools/storage';

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
const AppProvider = ({ children }) => {
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

  // update storage
  useEffect(() => {
    setLS('dark', !app.settings.remember ? false : app.settings.dark);
    setLS('remember', app.settings.remember);
  }, [app.settings]);

  // change theme
  useEffect(() => {
    const style = document.querySelector(':root').style;
    style.cssText += ';' + (preferences.dark ? DARK_THEME : LIGHT_THEME);
  }, [app.settings.dark]);

  // 2s delay while user toggles before updating server
  let settingsTimer = useRef(null);
  useEffect(() => {
    if (settingsUpdated) {
      setApp((prev) => ({ ...prev, settingsFetching: true }));
      clearTimeout(settingsTimer.current);
      settingsTimer.current = setTimeout(updateDB, 2000);
    }
    async function updateDB() {
      let newPrevious = app.settings;
      let newUpdated = true;
      for (let key of Object.keys(app.settings)) {
        if (app.user.preferences[key] !== app.settings[key]) {
          await axios.post('/common/update/preferences', app.user.preferences);
          newPrevious = app.user.preferences;
          newUpdated = false;
          break;
        }
      }
      setApp((prev) => ({
        ...prev,
        settings: newPrevious,
        settingsUpdated: newUpdated,
        settingsFetching: false,
      }));
    }
    return () => clearTimeout(settingsTimer.current);
  }, [app.settingsUpdated, app.settings, app.user.settings]);

  return (
    <SetApp.Provider value={setApp}>
      <App.Provider value={app}>{children}</App.Provider>
    </SetApp.Provider>
  );
};

export default AppProvider;
