import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { SetUser, SetLoggedIn } from '../../Providers/User.js';
import LoginForm from './Forms/LoginForm.js';

const Login = ({ closeModal, setLoading, error, setError }) => {
  const setUser = useContext(SetUser);
  const setLoggedIn = useContext(SetLoggedIn);

  const submit = async (type, email, password) => {
    try {
      setLoading(true);
      const res = await axios.post(`/common/${type}`, {
        email,
        password,
      });
      setError('');
      setUser(res.data);
      setLoggedIn(true);
    } catch (e) {
      const error = e.response.data || e.message;
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className='overlay' onClick={closeModal}></div>
      <div className='modal'>
        {error && <h2>{error}</h2>}
        <LoginForm submit={submit} setError={setError} />
      </div>
    </>,
    document.getElementById('portal')
  );
};
export default Login;
