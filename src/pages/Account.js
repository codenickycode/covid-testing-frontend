import React, { useState, useContext } from 'react';
import { LoggedIn } from '../Providers/User.js';
import AccountHeader from './Account/AccountHeader.js';
import AccountItemsList from './Account/AccountItemsList.js';
import LoginModal from './Modal/LoginModal.js';

const Loading = () => <h1>Loading...</h1>;
const Error = (error) => <h1>{error}</h1>;

const Account = () => {
  const loggedIn = useContext(LoggedIn); // replace this with 'loggedIn'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return loading ? (
    <Loading />
  ) : error ? (
    <Error error={error} />
  ) : !loggedIn ? (
    <LoginModal
      closeModal={null}
      setLoading={setLoading}
      error={error}
      setError={setError}
    />
  ) : (
    <div id='account-div'>
      <AccountHeader />
      <AccountItemsList />
    </div>
  );
};

export default Account;
