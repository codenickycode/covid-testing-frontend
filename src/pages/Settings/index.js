import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { setLS } from '../../tools/storage';
import useCustomHooks from './customHooks';
import { ButtonSkeleton } from '../../components/Skeletons';

const Settings = () => {
  const use = useCustomHooks();
  const [prevPref, setPrevPref] = useState(use.preferences);
  const [fetching, setFetching] = useState(false);

  const handleCheck = (e) => {
    const { name } = e.target;
    const update = { ...prevPref, [name]: !prevPref[name] };
    use.setPreferences(update);
    setPrevPref(update);
    setLS('dark', !update.remember ? false : update.dark);
    setLS('remember', update.remember);
    use.setUpdated(true);
  };

  useEffect(() => {
    setFetching(true);
    const timer = setTimeout(() => setFetching(false), 2000);
    return () => clearTimeout(timer);
  }, [use.preferences]);

  return !use.loggedIn || use.refresh ? (
    <Redirect to='/gateway/settings' />
  ) : (
    <div id='settings-div'>
      <ol className='switches'>
        <li>
          <input
            type='checkbox'
            id='toggle-dark'
            name='dark'
            checked={use.preferences.dark}
            onChange={handleCheck}
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
            name='remember'
            checked={use.preferences.remember}
            onChange={handleCheck}
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
            name='notifications'
            checked={use.preferences.notifications}
            onChange={handleCheck}
          />
          <label htmlFor='toggle-notifications'>
            <span>E-mail notifications</span>
            <span></span>
          </label>
        </li>
      </ol>
      {fetching ? (
        <ButtonSkeleton />
      ) : (
        <button
          type='button'
          className='btn'
          onClick={use.logout}
          disabled={fetching}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Settings;
