import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import LoginForm from './Forms/LoginForm.js';
import { useTryCatchFinally } from '../../tools/useTryCatchFinally.js';
import { App, SetApp } from '../../Providers/ContextProvider.js';
import { useSetAllAccount } from '../../Providers/AccountProvider.js';

const Login = ({ closeModal }) => {
  const tryCatchFinally = useTryCatchFinally();
  const { loading, error } = useContext(App);
  const setApp = useContext(SetApp);
  const setAllAccount = useSetAllAccount();

  const [userError, setUserError] = useState('');

  const submit = (...tryArgs) => {
    tryCatchFinally(tryFunc, tryArgs);
    async function tryFunc(type, email, password) {
      const res = await axios.post(`/common/${type}`, {
        email,
        password,
      });
      setAllAccount({ ...res.data, headerName: res.data.name.firstName });
      setApp((prevState) => ({
        ...prevState,
        loggedIn: true,
      }));
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className='overlay' onClick={closeModal}></div>
      <div className='modal'>
        {loading && <h1>loading...</h1>}
        {error && <h2>{error}</h2>}
        {userError && <h2>{userError}</h2>}
        <LoginForm submit={submit} setUserError={setUserError} />
      </div>
    </>,
    document.getElementById('portal')
  );
};
export default Login;
