import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { App, Refresh } from '../Providers/ContextProvider.js';
import { Preferences, SetPreferences } from '../Providers/AccountProvider.js';
import { setLS } from '../tools/tools.js';

const Settings = () => {
  const { loggedIn } = useContext(App);
  const refresh = useContext(Refresh);
  const preferences = useContext(Preferences);
  const { setPreferences, updated } = useContext(SetPreferences);
  const [prevPref, setPrevPref] = useState(preferences);

  const handleCheck = (field) => {
    const update = { ...prevPref, [field]: !prevPref[field] };
    console.log(update);
    setPreferences(update);
    setPrevPref(update);
    if (!update.remember) {
      setLS('dark', false);
    } else {
      setLS('dark', update.dark);
    }
    setLS('remember', update.remember);
    updated();
  };

  return !loggedIn || refresh ? (
    <Redirect to='/gateway/settings' />
  ) : (
    <div id='settings-div'>
      <ol className='switches'>
        <li>
          <input
            type='checkbox'
            id='toggle-dark'
            checked={preferences.dark}
            onChange={() => handleCheck('dark')}
          />
          <label htmlFor='toggle-dark'>
            <span>Dark Mode</span>
            <span></span>
          </label>
        </li>
        <li>
          <input
            type='checkbox'
            id='toggle-remember'
            checked={preferences.remember}
            onChange={() => handleCheck('remember')}
          />
          <label htmlFor='toggle-remember'>
            <span>Keep me logged in!</span>
            <span></span>
          </label>
        </li>
        <li>
          <input
            type='checkbox'
            id='toggle-notifications'
            checked={preferences.notifications}
            onChange={() => handleCheck('notifications')}
          />
          <label htmlFor='toggle-notifications'>
            <span>E-mail notifications</span>
            <span></span>
          </label>
        </li>
      </ol>
    </div>
  );
};

export default Settings;
