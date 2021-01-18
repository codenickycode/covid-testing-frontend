import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { App, Refresh, SetRefresh } from '../Providers/ContextProvider.js';
import { useSetAllAccount } from '../Providers/AccountProvider.js';
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
  const refresh = useContext(Refresh);
  const setRefresh = useContext(SetRefresh);
  const setAllAccount = useSetAllAccount();
  const tryCatchFinally = useTryCatchFinally();

  const [initial, setInitial] = useState(true);

  const getClient = useCallback(() => {
    tryCatchFinally(tryFunc, undefined, catchFunc, finallyFunc);
    async function tryFunc() {
      const res = await axios.get('/common/user');
      setAllAccount({ ...res.data, headerName: res.data.name.firstName });
    }
    function catchFunc() {
      history.push('/');
    }
    function finallyFunc() {
      setRefresh(false);
    }
  }, [history, setAllAccount, setRefresh, tryCatchFinally]);

  useEffect(() => {
    if (loggedIn && refresh && initial) {
      setInitial(false);
      getClient();
    } else if (loggedIn && !refresh) {
      history.push(`/${to}`);
    }
  }, [loggedIn, refresh, initial, setInitial, getClient, history, to]);

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
