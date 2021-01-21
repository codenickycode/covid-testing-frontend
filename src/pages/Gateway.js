import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { App, Refresh } from '../Providers/Context.js';
import { Preferences } from '../Providers/Account.js';
import { useTryCatchFinally } from '../tools/useTryCatchFinally';
import LoginModal from './Modals/Login/Login';
import {
  AccountSkeleton,
  AppointmentsSkeleton,
  SettingsSkeleton,
} from '../components/Skeletons.js';
import { useGetClient } from '../tools/useGetClient.js';

const Gateway = () => {
  const history = useHistory();
  const { to } = useParams();
  const { loggedIn } = useContext(App);
  const { remember } = useContext(Preferences);
  const refresh = useContext(Refresh);
  const tryCatchFinally = useTryCatchFinally();
  const getClient = useGetClient();

  const [initial, setInitial] = useState(true);

  useEffect(() => {
    if (initial) {
      if ((loggedIn && refresh) || (!loggedIn && remember)) {
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
    remember,
    refresh,
    initial,
    setInitial,
    history,
    to,
    getClient,
    tryCatchFinally,
  ]);

  return !loggedIn && !remember ? (
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
