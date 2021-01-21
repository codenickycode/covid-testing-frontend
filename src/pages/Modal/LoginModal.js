import React, { useState, useContext, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import * as tools from '../../tools/tools.js';
import LoginForm from './Forms/LoginForm.js';
import { useTryCatchFinally } from '../../tools/useTryCatchFinally.js';
import { App, SetApp } from '../../Providers/ContextProvider.js';
import { useSetAllAccount } from '../../Providers/AccountProvider.js';
import { LoginSkeleton } from '../Skeletons.js';

const INIT_FIELDS = { email: '', password: '', confirmation: '' };

const Login = ({ closeModal }) => {
  const tryCatchFinally = useTryCatchFinally();
  const { loading, error } = useContext(App);
  const setApp = useContext(SetApp);
  const setAllAccount = useSetAllAccount();

  const [signup, setSignup] = useState(true);
  const [inputs, setInputs] = useState(INIT_FIELDS);
  const [errors, setErrors] = useState(INIT_FIELDS);
  const inputRefs = useRef({});

  const setError = (field, error) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

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
        confirmation: 'Success!',
      }));
      tools.setLS('remember', res.data.preferences.remember);
      tools.setLS('dark', res.data.preferences.dark);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signup) {
      if (!tools.validPassword(inputs.password)) {
        setError('password', 'Invalid password');
        inputRefs.current.password.current.focus();
        return;
      }
      if (inputs.password !== inputs.confirmation) {
        setError('confirmation', "Confirmation doesn't match");
        inputRefs.current.confirmation.current.focus();
        return;
      }
      setErrors(INIT_FIELDS);
      submit('register', inputs.email, inputs.password);
    } else {
      submit('login', inputs.email, inputs.password);
    }
  };

  useEffect(() => {
    if (error === 'User already registered.') {
      setError('email', error);
      inputRefs.current.email.current.focus();
    }
  }, [error]);

  const handleInput = (e, field) => {
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setInputs((prev) => ({ ...prev, [field]: e.target.value }));
  };

  useEffect(() => {
    setErrors(INIT_FIELDS);
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
            inputRefs={inputRefs}
          />
        )}
      </div>
    </>,
    document.getElementById('portal')
  );
};
export default Login;
