import React from 'react';
import Image from '../../../components/Image';
import { ReactComponent as LogoIcon } from '../../../icons/Logo.svg';
import { ReactComponent as EmailIcon } from '../../../icons/Message.svg';
import { ReactComponent as PasswordIcon } from '../../../icons/Password.svg';

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
      <div className='with-spacer'>
        <LogoIcon />
        {signup ? (
          <h1>Create an account with CityMD</h1>
        ) : (
          <h1>Login to your account</h1>
        )}
      </div>
      <p>to confirm your appointment</p>
      {window.innerHeight > 650 && (
        <Image src='/img/png/login.png' alt='Login illustration' size='med' />
      )}
      <form onSubmit={handleSubmit}>
        <p className='small red'>*required fields</p>
        {errors.email && <h2 className='error'>{errors.email}</h2>}
        <div className='with-spacer'>
          <EmailIcon />
          <label htmlFor='email'>Email</label>
        </div>
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
        <div className='with-spacer'>
          <PasswordIcon />
          <label htmlFor='password'>Password</label>
        </div>
        <input
          type='password'
          name='password'
          className={errors.password ? 'invalid password' : 'password'}
          value={inputs.password || ''}
          onChange={handleInput}
          placeholder={signup ? 'Create your password' : 'Enter your password'}
        />
        {signup && (
          <p
            className={
              errors.password ? 'error smaller password' : 'smaller password'
            }
          >
            min. 8 digits: lower, upper, and num
          </p>
        )}
        {signup && (
          <>
            {errors.confirmation && (
              <h2 className='error'>{errors.confirmation}</h2>
            )}
            <div className='with-spacer'>
              <PasswordIcon />
              <label htmlFor='confirmation'>Confirm</label>
            </div>
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
