import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import useLogout from './useLogout';
import { ButtonSkeleton } from '../../components/Skeletons';
import { App, SetApp } from '../../Providers/FullContextProvider';

const Settings = () => {
  const logout = useLogout();
  const { user, settings, settingsFetching } = useContext(App);
  const { setApp } = useContext(SetApp);

  const handleCheck = (e) => {
    const { name } = e.target;
    const update = { ...settings, [name]: !settings[name] };
    setApp((prev) => ({
      ...prev,
      settingsUpdated: true,
      user: { ...prev.user, preferences: update },
    }));
  };

  return !user ? (
    <Redirect to='/gateway/settings' />
  ) : (
    <div id='settings-div'>
      <ol className='switches'>
        <li>
          <input
            type='checkbox'
            id='toggle-dark'
            name='dark'
            checked={user.preferences.dark}
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
            checked={user.preferences.remember}
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
            checked={user.preferences.notifications}
            onChange={handleCheck}
          />
          <label htmlFor='toggle-notifications'>
            <span>E-mail notifications</span>
            <span></span>
          </label>
        </li>
      </ol>
      {settingsFetching ? (
        <ButtonSkeleton />
      ) : (
        <button type='button' className='btn' onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Settings;
