import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { App, Refresh } from '../../Providers/Context.js';
import useCustomHooks from '../../tools/useCustomHooks';
import LoginModal from '../Modals/Login/Login';
import {
  AccountSkeleton,
  AppointmentsSkeleton,
  SettingsSkeleton,
} from '../../components/Skeletons.js';
import { Preferences } from '../../Providers/Preferences.js';

const Gateway = () => {
  const history = useHistory();
  const { to } = useParams();
  const { loggedIn } = useContext(App);
  const refresh = useContext(Refresh);
  const { preferences } = useContext(Preferences);
  const { getClient } = useCustomHooks();

  const [initial, setInitial] = useState(true);

  useEffect(() => {
    if (loggedIn && !refresh) {
      history.replace(`/${to}`);
    }

    if (initial) {
      if ((!loggedIn && preferences.remember) || (loggedIn && refresh)) {
        setInitial(false);
        getClient();
      }
    }
  }, [
    loggedIn,
    refresh,
    history,
    to,
    initial,
    preferences.remember,
    getClient,
  ]);

  return !loggedIn ? (
    <LoginModal
      closeModal={
        history.globalHistory ? history.goBack : () => history.push('/')
      }
    />
  ) : to === 'account' ? (
    <AccountSkeleton />
  ) : to === 'appointments' ? (
    <AppointmentsSkeleton />
  ) : to === 'settings' ? (
    <SettingsSkeleton />
  ) : null;
};

export default Gateway;
