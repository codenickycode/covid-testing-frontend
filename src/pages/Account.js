import React, { useState, useEffect, useContext } from 'react';
import { User, SetUser } from '../Providers/User.js';
import dayjs from 'dayjs';
import axios from 'axios';
import AccountItemsList from './Account/AccountItemsList.js';
import LoginModal from './Modal/LoginModal.js';

const Loading = () => <h1>Loading...</h1>;
const Error = (error) => <h1>{error}</h1>;

const UPDATES_INIT = {};
let greeting = '';

const Account = () => {
  const user = useContext(User);
  const setUser = useContext(SetUser);
  const [updates, setUpdates] = useState(UPDATES_INIT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    Object.entries(user).forEach((v, k) => (UPDATES_INIT[v[0]] = false));
    const now = new dayjs();
    const time =
      now.$H > 3 && now.$H < 12
        ? 'morning'
        : now.$H < 17
        ? 'afternoon'
        : 'evening';
    greeting = `Good ${time}, ${user.firstName}`;
  }, [user]);

  return loading ? (
    <Loading />
  ) : error ? (
    <Error error={error} />
  ) : !user ? (
    <LoginModal
      closeModal={null}
      setLoading={setLoading}
      error={error}
      setError={setError}
    />
  ) : (
    <div id='account-div'>
      <div id='account-top'>
        <img src='#' alt='User Photo' />
        <h1>{greeting}</h1>
      </div>
      <AccountItemsList user={user} updates={updates} setUpdate={setUpdates} />
    </div>
  );
};

export default Account;
