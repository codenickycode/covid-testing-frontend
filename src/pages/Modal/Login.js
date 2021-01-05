import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { SetUser } from '../../Providers/User.js';
import LoginForm from './Forms/LoginForm.js';

const Loading = () => <h1>Loading...</h1>;

const Login = ({ closeModal, loading, setLoading }) => {
  const setUser = useContext(SetUser);
  const [invalid, setInvalid] = useState('');

  const registerUser = async (email, password) => {
    try {
      setLoading(true);
      const res = await axios.post('/common/register', {
        email,
        password,
      });
      setInvalid('');
      setUser(res.data);
    } catch (e) {
      const error = e.response.data || e.message;
      setInvalid(error);
    } finally {
      setLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className='overlay' onClick={closeModal}></div>
      <div className='modal'>
        {loading ? (
          <Loading />
        ) : (
          <LoginForm
            registerUser={registerUser}
            invalid={invalid}
            setInvalid={setInvalid}
          />
        )}
      </div>
    </>,
    document.getElementById('portal')
  );
};
export default Login;
