import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GetLoggedIn } from '../Providers/providers.js';
import AccountHeader from './Account/AccountHeader.js';
import AccountItemsList from './Account/AccountItemsList.js';
import LoginModal from './Modal/LoginModal.js';

const Account = () => {
  const history = useHistory();
  const loggedIn = useContext(GetLoggedIn);

  return !loggedIn ? (
    <LoginModal closeModal={history.goBack} />
  ) : (
    <div id='account-div'>
      {/* <UserNameProvider> */}
      <AccountHeader />
      {/* </UserNameProvider> */}
      <AccountItemsList />
    </div>
  );
};

export default Account;
