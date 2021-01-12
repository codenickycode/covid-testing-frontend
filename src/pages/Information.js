import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GetAppContext } from '../Providers/AppContextProvider.js';
import LoginModal from './Modal/LoginModal.js';

const Information = () => {
  const history = useHistory();
  const { loggedIn } = useContext(GetAppContext);

  return !loggedIn ? (
    <LoginModal closeModal={history.goBack} />
  ) : (
    <div id='information-div'></div>
  );
};

export default Information;
