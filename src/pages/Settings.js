import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { App, SetApp } from '../Providers/ContextProvider.js';
import LoginModal from './Modal/LoginModal.js';

const Settings = () => {
  const history = useHistory();
  const { loggedIn, title } = useContext(App);

  const setApp = useContext(SetApp);
  if (title !== 'Settings')
    setApp((prevState) => ({ ...prevState, title: 'Settings' }));

  return !loggedIn ? (
    <LoginModal closeModal={history.goBack} />
  ) : (
    <div id='settings-div'></div>
  );
};

export default Settings;
