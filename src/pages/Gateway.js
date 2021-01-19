import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  App,
  Refresh,
  SetApp,
  SetRefresh,
} from '../Providers/ContextProvider.js';
import { Preferences, useSetAllAccount } from '../Providers/AccountProvider.js';
import { useTryCatchFinally } from '../tools/useTryCatchFinally';
import LoginModal from './Modal/LoginModal';
import {
  AccountSkeleton,
  AppointmentsSkeleton,
  SettingsSkeleton,
} from './Skeletons.js';

const Gateway = () => {
  const history = useHistory();
  const { to } = useParams();
  const { loggedIn } = useContext(App);
  const setApp = useContext(SetApp);
  const { remember } = useContext(Preferences);
  const refresh = useContext(Refresh);
  const setRefresh = useContext(SetRefresh);
  const setAllAccount = useSetAllAccount();
  const tryCatchFinally = useTryCatchFinally();

  const [initial, setInitial] = useState(true);

  const getClient = useCallback(() => {
    tryCatchFinally(tryFunc, undefined, catchFunc);
    async function tryFunc() {
      const res = await axios.get('/common/user');
      setAllAccount({ ...res.data, headerName: res.data.name.firstName });
      setApp((prevState) => ({ ...prevState, loggedIn: true }));
      setRefresh(false);
    }
    function catchFunc() {
      history.push('/');
      setInitial(true);
    }
  }, [history, setAllAccount, setRefresh, tryCatchFinally]);

  useEffect(() => {
    if (initial) {
      if ((loggedIn && refresh) || (!loggedIn && remember)) {
        setInitial(false);
        getClient();
      }
    }
    if (loggedIn && !refresh) {
      history.push(`/${to}`);
    }
  }, [
    loggedIn,
    remember,
    refresh,
    initial,
    setInitial,
    getClient,
    history,
    to,
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
