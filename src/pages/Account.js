import React, { useContext } from 'react';
import { GetLoggedIn } from '../Providers/providers.js';
// import AccountHeader from './Account/AccountHeader.js';
import AccountItemsList from './Account/AccountItemsList.js';
import LoginModal from './Modal/LoginModal.js';

const Account = () => {
  const loggedIn = useContext(GetLoggedIn);

  return !loggedIn ? (
    <LoginModal closeModal={null} />
  ) : (
    <div id='account-div'>
      {/* <AccountHeader /> */}
      <AccountItemsList />
    </div>
  );
};

export default Account;
