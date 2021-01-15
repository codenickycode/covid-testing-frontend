import React, { useState } from 'react';
import * as tools from '../../../tools/tools.js';

const LoginForm = ({ submit, setUserError }) => {
  const [signup, setSignup] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signup) {
      if (!tools.validPassword(password))
        return setUserError('Invalid password');
      if (password !== confirmation)
        return setUserError("Confirmation doesn't match");
      setUserError('');
      submit('register', email, password);
    } else {
      submit('login', email, password);
    }
  };

  const forgotPassword = () => {
    console.log('forgot password');
  };

  return (
    <div className='login-form-div'>
      {signup ? (
        <>
          <h1>Create an account with CityMD</h1>
          <p>Book appointments smoothly</p>
        </>
      ) : (
        <h1>Login to your account</h1>
      )}
      <form id='form-signup' className='form-modal' onSubmit={handleSubmit}>
        <p className='info-small'>*required fields</p>
        <label htmlFor='email' className='label-small'>
          <span className='info-small'>*</span>Email
        </label>
        <input
          autoFocus
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email address'
        />
        <label htmlFor='password' className='label-small'>
          <span className='info-small'>*</span>Password
        </label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={inputPassword}
          placeholder={signup ? 'Create your password' : 'Enter your password'}
        />
        {signup && (
          <>
            <label htmlFor='confirmation' className='label-small'>
              <span className='info-small'>*</span>Confirm
            </label>
            <input
              type='password'
              name='confirmation'
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder='Confirm your password'
            />
          </>
        )}
        <button type='submit' className='btn'>
          {signup ? 'Create An Account' : 'Login'}
        </button>
        {!signup && (
          <p>
            Forgot your password?{' '}
            <span onClick={forgotPassword}>Click here</span>
          </p>
        )}
      </form>
      {signup ? (
        <>
          <p>Already have an account?</p>
          <button className='btn' onClick={() => setSignup(false)}>
            Login
          </button>
        </>
      ) : (
        <>
          <p>Don't have an account?</p>
          <button className='btn' onClick={() => setSignup(true)}>
            Signup
          </button>
        </>
      )}
    </div>
  );
};

export default LoginForm;
