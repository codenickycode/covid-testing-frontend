import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { App } from '../Providers/ContextProvider.js';
import AccountHeader from './Account/AccountHeader.js';
import AccountItemsList from './Account/AccountItemsList.js';
import LoginModal from './Modal/LoginModal.js';

const Account = () => {
  const history = useHistory();
  const { loggedIn } = useContext(App);

  return !loggedIn ? (
    <LoginModal closeModal={history.goBack} />
  ) : (
    <div id='account-div'>
      <AccountHeader />
      <AccountItemsList />
    </div>
  );
};

export default Account;
