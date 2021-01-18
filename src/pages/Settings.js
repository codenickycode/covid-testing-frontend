import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { App, Refresh, SetApp } from '../Providers/ContextProvider.js';

const Settings = () => {
  const { loggedIn, dark, remember } = useContext(App);
  const setApp = useContext(SetApp);
  const refresh = useContext(Refresh);

  return !loggedIn || refresh ? (
    <Redirect to='/gateway/settings' />
  ) : (
    <div id='settings-div'>
      <ol className='switches'>
        <li>
          <input type='checkbox' id='toggle-dark' />
          <label htmlFor='1'>
            <span>Dark Mode</span>
            <span></span>
          </label>
        </li>
        <li>
          <input type='checkbox' id='toggle-remember' />
          <label htmlFor='1'>
            <span>Keep me logged in!</span>
            <span></span>
          </label>
        </li>
      </ol>
    </div>
  );
};

export default Settings;
