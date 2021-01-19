import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import LoginForm from './Forms/LoginForm.js';
import { useTryCatchFinally } from '../../tools/useTryCatchFinally.js';
import { App, SetApp } from '../../Providers/ContextProvider.js';
import { useSetAllAccount } from '../../Providers/AccountProvider.js';
import { setLS } from '../../tools/tools.js';

const Login = ({ closeModal }) => {
  const tryCatchFinally = useTryCatchFinally();
  const { error, loading } = useContext(App);
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
      setLS('remember', res.data.preferences.remember);
      setLS('dark', res.data.preferences.dark);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className='overlay' onClick={closeModal}></div>
      <div className='modal'>
        {error && !loading && <h2 className='error'>{error}</h2>}
        {userError && <h2 className='error'>{userError}</h2>}
        <LoginForm submit={submit} setUserError={setUserError} />
      </div>
    </>,
    document.getElementById('portal')
  );
};
export default Login;
