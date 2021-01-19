import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { App, Refresh } from '../Providers/ContextProvider.js';
import { Preferences, useSetAccount } from '../Providers/AccountProvider.js';

const Settings = () => {
  const { loggedIn } = useContext(App);
  const refresh = useContext(Refresh);
  const preferences = useContext(Preferences);
  const { setPreferences } = useSetAccount();

  const [prevPref, setPrevPref] = useState(preferences);

  const handleCheck = (field) => {
    const update = { ...prevPref, [field]: !prevPref[field] };
    setPreferences(update);
    setPrevPref(update);
    axios.post('/common/update/preferences', update);
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
