import React, { useRef, useEffect } from 'react';

const LoginForm = ({
  handleSubmit,
  signup,
  setSignup,
  handleInput,
  input,
  inputRefs,
  invalid,
  userError,
  fields,
  setFields,
}) => {
  const { email, password, confirmation } = fields;

  const forgotPassword = () => {
    console.log('forgot password');
  };

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmationRef = useRef();

  useEffect(() => {
    inputRefs.current = {
      email: emailRef,
      password: passwordRef,
      confirmation: confirmationRef,
    };
  }, [inputRefs, emailRef, passwordRef, confirmationRef]);

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
        {email.error && <h3 className='error'>{email.error}</h3>}
        <label htmlFor='email' className='label-small'>
          <span className='info-small'>*</span>Email
        </label>
        <input
          autoFocus
          ref={emailRef}
          type='email'
          name='email'
          className={email.error ? 'invalid-field' : ''}
          value={email.input || ''}
          onChange={(e) => handleInput(e, 'email')}
          placeholder='Enter your email address'
        />
        {password.error && <h3 className='error'>{password.error}</h3>}
        <label htmlFor='password' className='label-small'>
          <span className='info-small'>*</span>Password
        </label>
        <input
          ref={passwordRef}
          type='password'
          name='password'
          className={password.error ? 'invalid-field' : ''}
          value={password.input || ''}
          onChange={(e) => handleInput(e, 'password')}
          placeholder={signup ? 'Create your password' : 'Enter your password'}
        />
        {signup && (
          <>
            {confirmation.error && (
              <h3 className='error'>{confirmation.error}</h3>
            )}
            <label htmlFor='confirmation' className='label-small'>
              <span className='info-small'>*</span>Confirm
            </label>
            <input
              ref={confirmationRef}
              type='password'
              name='confirmation'
              className={confirmation.error ? 'invalid-field' : ''}
              value={confirmation.input || ''}
              onChange={(e) => handleInput(e, 'confirmation')}
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
