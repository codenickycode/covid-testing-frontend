import React from 'react';
import Image from '../../../components/Image';

const LoginForm = ({
  handleSubmit,
  signup,
  setSignup,
  handleInput,
  inputs,
  errors,
}) => {
  const forgotPassword = () => {
    console.log('forgot password');
  };

  return (
    <div id='login-form'>
      {signup ? (
        <h1>
          <span className='logo'></span>Create an account with CityMD
        </h1>
      ) : (
        <h1>
          <span className='logo'></span>Login to your account
        </h1>
      )}
      <p>to confirm your appointment</p>
      <Image src='/img/png/login.png' alt='Login illustration' size='med' />
      <form onSubmit={handleSubmit}>
        <p className='info-small'>*required fields</p>
        {errors.email && <h2 className='error'>{errors.email}</h2>}
        <label id='login-email' htmlFor='email'>
          Email
        </label>
        <input
          autoFocus
          type='email'
          name='email'
          className={errors.email ? 'invalid' : ''}
          value={inputs.email || ''}
          onChange={handleInput}
          placeholder='Enter your email address'
        />
        {errors.password && <h2 className='error'>{errors.password}</h2>}
        <label id='login-password' htmlFor='password'>
          Password
        </label>
        <input
          type='password'
          name='password'
          className={errors.password ? 'invalid' : ''}
          value={inputs.password || ''}
          onChange={handleInput}
          placeholder={signup ? 'Create your password' : 'Enter your password'}
        />
        {signup && (
          <p className='smaller'>
            min. 8 digits: lowercase, uppercase, and number
          </p>
        )}
        {signup && (
          <>
            {errors.confirmation && (
              <h2 className='error'>{errors.confirmation}</h2>
            )}
            <label id='login-confirmation' htmlFor='confirmation'>
              Confirm
            </label>
            <input
              type='password'
              name='confirmation'
              className={errors.confirmation ? 'invalid' : ''}
              value={inputs.confirmation || ''}
              onChange={handleInput}
              placeholder='Confirm your password'
            />
          </>
        )}
        <button type='submit' className='btn'>
          {signup ? 'Create An Account' : 'Sign In'}
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
