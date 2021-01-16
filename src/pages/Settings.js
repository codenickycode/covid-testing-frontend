import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { App } from '../Providers/ContextProvider.js';
import LoginModal from './Modal/LoginModal.js';

const Settings = () => {
  const history = useHistory();
  const { loggedIn } = useContext(App);

  return !loggedIn ? (
    <LoginModal closeModal={history.goBack} />
  ) : (
    <div id='settings-div'></div>
  );
};

export default Settings;
