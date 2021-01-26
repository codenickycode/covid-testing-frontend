import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import tools from '../../../tools/index.js';
import LoginForm from './Form.js';
import useLogin from './useLogin.js';
import { LoginSkeleton } from '../../../components/Skeletons.js';
import { App } from '../../../Providers/Context.js';

const INIT = { email: '', password: '', confirmation: '' };

const Login = ({ closeModal }) => {
  const { loading, error } = useContext(App);
  const login = useLogin();

  const [signup, setSignup] = useState(true);
  const [inputs, setInputs] = useState(INIT);
  const [errors, setErrors] = useState(INIT);

  const setError = (field, error) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const setInvalid = (field, message) => {
    setError(field, message);
    document.querySelector(`input[name=${field}]`).focus();
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setError(name, '');
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.email) return setInvalid('email', 'Email required');
    if (!tools.validPassword(inputs.password))
      return setInvalid('password', 'Invalid password');
    if (signup) {
      if (inputs.password !== inputs.confirmation)
        return setInvalid('confirmation', "Confirmation doesn't match");
      setErrors(INIT);
      login('register', inputs.email, inputs.password);
    } else {
      login('login', inputs.email, inputs.password);
    }
  };

  useEffect(() => {
    if (error === 'User already registered.') {
      setError('email', error);
      document.querySelector('input[name="email"]').focus();
    }
  }, [error]);

  useEffect(() => {
    setErrors(INIT);
  }, [signup]);

  return ReactDOM.createPortal(
    <>
      <div className='overlay' onClick={closeModal}></div>
      <div className='modal'>
        {loading ? (
          <LoginSkeleton
            header={signup ? 'Registering...' : 'Logging In...'}
            message='Please wait while we complete your request.'
          />
        ) : (
          <LoginForm
            signup={signup}
            setSignup={setSignup}
            handleInput={handleInput}
            handleSubmit={handleSubmit}
            inputs={inputs}
            errors={errors}
          />
        )}
      </div>
    </>,
    document.getElementById('portal')
  );
};
export default Login;