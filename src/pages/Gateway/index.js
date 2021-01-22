import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { App, Refresh } from '../../Providers/Context.js';
import { Preferences } from '../../Providers/Preferences.js';
import { useTryCatchFinally } from '../../tools/useTryCatchFinally';
import { useGetClient } from '../../tools/fetching';
import LoginModal from '../Modals/Login/Login';
import {
  AccountSkeleton,
  AppointmentsSkeleton,
  SettingsSkeleton,
} from '../../components/Skeletons.js';

const Gateway = () => {
  const history = useHistory();
  const { to } = useParams();
  const { loggedIn } = useContext(App);
  const { preferences } = useContext(Preferences);
  const refresh = useContext(Refresh);
  const tryCatchFinally = useTryCatchFinally();
  const getClient = useGetClient();

  const [initial, setInitial] = useState(true);

  useEffect(() => {
    if (initial) {
      if ((loggedIn && refresh) || (!loggedIn && preferences.remember)) {
        setInitial(false);
        tryCatchFinally(getClient, catchFunc);
      }
    }
    if (loggedIn && !refresh) {
      history.push(`/${to}`);
    }

    function catchFunc() {
      history.push('/');
      setInitial(true);
    }
  }, [
    loggedIn,
    preferences.remember,
    refresh,
    initial,
    setInitial,
    history,
    to,
    getClient,
    tryCatchFinally,
  ]);

  return !loggedIn && !preferences.remember ? (
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
