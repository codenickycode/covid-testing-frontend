import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import useCustomHooks from './customHooks';
import { ButtonSkeleton } from '../../components/Skeletons';
import { Preferences, SetPreferences } from '../../Providers/Preferences';

const Settings = () => {
  const use = useCustomHooks();

  const { preferences, fetching } = useContext(Preferences);
  const { setPreferences, setUpdated } = useContext(SetPreferences);

  const handleCheck = (e) => {
    const { name } = e.target;
    const update = { ...preferences, [name]: !preferences[name] };
    setPreferences(update);
    setUpdated(true);
  };

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
            checked={preferences.dark}
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
            checked={preferences.remember}
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
            checked={preferences.notifications}
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
