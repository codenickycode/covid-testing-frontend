import React, { useState, useContext, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import * as tools from '../../tools/tools.js';
import LoginForm from './Forms/LoginForm.js';
import { useTryCatchFinally } from '../../tools/useTryCatchFinally.js';
import { App, SetApp } from '../../Providers/ContextProvider.js';
import { useSetAllAccount } from '../../Providers/AccountProvider.js';
import { LoginSkeleton } from '../Skeletons.js';

const Login = ({ closeModal }) => {
  const tryCatchFinally = useTryCatchFinally();
  const { loading, error } = useContext(App);
  const setApp = useContext(SetApp);
  const setAllAccount = useSetAllAccount();

  const [signup, setSignup] = useState(true);

  const [fields, setFields] = useState({
    email: { input: '', error: '' },
    password: { input: '', error: '' },
    confirmation: { input: '', error: '' },
  });

  const clearErrors = () => {
    console.log(fields.email.input);
    setFields((prev) => ({
      email: { ...prev.email, error: '' },
      password: { ...prev.password, error: '' },
      confirmation: { ...prev.confirmation, error: '' },
    }));
  };

  const setError = (field, error) => {
    setFields((prev) => ({ ...prev, [field]: { ...prev[field], error } }));
  };

  const inputRefs = useRef({});

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
      tools.setLS('remember', res.data.preferences.remember);
      tools.setLS('dark', res.data.preferences.dark);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmation } = fields;
    if (signup) {
      if (!tools.validPassword(password.input)) {
        setError('password', 'Invalid password');
        inputRefs.current.password.current.focus();
        return;
      }
      if (password.input !== confirmation.input) {
        setError('confirmation', "Confirmation doesn't match");
        inputRefs.current.confirmation.current.focus();
        return;
      }
      clearErrors();
      submit('register', email.input, password.input);
    } else {
      submit('login', email.input, password.input);
    }
  };

  useEffect(() => {
    if (error === 'User already registered.') {
      setError('email', error);
      inputRefs.current.email.current.focus();
    }
  }, [error]);

  const handleInput = (e, field) => {
    setFields((prev) => ({
      ...prev,
      [field]: { ...prev[field], error: '', input: e.target.value },
    }));
  };

  useEffect(() => {
    clearErrors();
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
            handleSubmit={handleSubmit}
            signup={signup}
            setSignup={setSignup}
            inputRefs={inputRefs}
            handleInput={handleInput}
            fields={fields}
            setFields={setFields}
          />
        )}
      </div>
    </>,
    document.getElementById('portal')
  );
};
export default Login;
