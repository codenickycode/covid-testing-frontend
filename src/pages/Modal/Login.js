import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { SetUser } from '../../Providers/User.js';
import LoginForm from './Forms/LoginForm.js';

const Login = ({ closeModal, setLoading, error, setError }) => {
  const setUser = useContext(SetUser);

  const registerUser = async (email, password) => {
    try {
      setLoading(true);
      const res = await axios.post('/common/register', {
        email,
        password,
      });
      setError('');
      setUser(res.data);
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
        <LoginForm registerUser={registerUser} setError={setError} />
      </div>
    </>,
    document.getElementById('portal')
  );
};
export default Login;
