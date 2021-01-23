import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { getLS, setLS } from '../tools/storage.js';
import { DARK_THEME, LIGHT_THEME } from '../tools/themes.js';

export const INIT_PREFERENCES = {
  dark: false,
  remember: false,
  notifications: false,
};

const LS_PREFERENCES = {
  dark: getLS('dark') || false,
  remember: getLS('remember') || false,
  notifications: false,
};

export const Preferences = React.createContext();
export const SetPreferences = React.createContext();

export default function PreferencesProvider({ children }) {
  const [preferences, setPreferences] = useState(LS_PREFERENCES);
  const [previous, setPrevious] = useState(preferences);
  const [updated, setUpdated] = useState(false);
  const [fetching, setFetching] = useState(false);

  // update storage
  useEffect(() => {
    setLS('dark', !preferences.remember ? false : preferences.dark);
    setLS('remember', preferences.remember);
  }, [preferences]);

  // change theme
  useEffect(() => {
    const style = document.querySelector(':root').style;
    style.cssText += ';' + (preferences.dark ? DARK_THEME : LIGHT_THEME);
  }, [preferences.dark]);

  // 2s delay while user toggles before updating server
  let timer = useRef(null);
  useEffect(() => {
    if (updated) {
      setFetching(true);
      timer.current = clearTimeout(timer.current);
      timer.current = setTimeout(updateAccount, 2000);
    }
    async function updateAccount() {
      for (let key of Object.keys(preferences)) {
        if (preferences[key] !== previous[key]) {
          await axios.post('/common/update/preferences', preferences);
          setPrevious(preferences);
          setUpdated(false);
          break;
        }
      }
      setFetching(false);
    }
    return () => clearTimeout(timer.current);
  }, [updated, preferences, previous]);

  return (
    <SetPreferences.Provider value={{ setPreferences, setUpdated }}>
      <Preferences.Provider value={{ preferences, fetching }}>
        {children}
      </Preferences.Provider>
    </SetPreferences.Provider>
  );
}
