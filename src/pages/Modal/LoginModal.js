import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import LoginForm from './Forms/LoginForm.js';
import { SetAppContext } from '../../Providers/AppContextProvider.js';
import { useSetAllAccountContext } from '../../Providers/AccountContextProvider.js';

const Login = ({ closeModal }) => {
  const { setLoggedIn, setNavDisabled } = useContext(SetAppContext);
  const setAllAccountContext = useSetAllAccountContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (type, email, password) => {
    try {
      setLoading(true);
      setNavDisabled(true);
      const res = await axios.post(`/common/${type}`, {
        email,
        password,
      });
      setAllAccountContext(res.data);
      setLoggedIn(true);
    } catch (e) {
      const error = e.response ? e.response.data : e.message;
      setError(error);
      setLoading(false);
      setNavDisabled(false);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className='overlay' onClick={closeModal}></div>
      <div className='modal'>
        {loading ? (
          <h1>loading...</h1>
        ) : (
          <>
            {error && <h2>{error}</h2>}
            <LoginForm submit={submit} setError={setError} />
          </>
        )}
      </div>
    </>,
    document.getElementById('portal')
  );
};
export default Login;
