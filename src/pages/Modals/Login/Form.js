import React from 'react';
import { ReactComponent as CreateAccount } from '../../../img/createAccount.svg';
import * as icons from '../../../icons';
import { Button, PWRequirements, WithIcon, Error } from '../../../components';

const LoginForm = ({
  handleSubmit,
  signup,
  setSignup,
  handleInput,
  inputs,
  errors,
}) => {
  return (
    <div id='login-form' className='flex-col'>
      <Header signup={signup} />
      <CreateAccount />
      <form onSubmit={handleSubmit}>
        <WithIcon icon={icons.email}>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='email'
            placeholder='Email'
            value={inputs.email}
            onChange={handleInput}
          />
        </WithIcon>
        <WithIcon icon={icons.password}>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={inputs.password}
            onChange={handleInput}
          />
        </WithIcon>
        {signup && <PWRequirements error={errors.password} />}
        {signup && (
          <WithIcon icon={icons.password}>
            <label htmlFor='confirmation'>Password Confirmation</label>
            <input
              name='confirmation'
              type='password'
              placeholder='Confirm Your Password'
              value={inputs.confirmation}
              onChange={handleInput}
            />
          </WithIcon>
        )}
        {errors.email && <Error error={errors.email} />}
        {errors.password && <Error error={errors.password} />}
        {errors.confirmation && <Error error={errors.confirmation} />}
        <Button type='submit' label={signup ? 'Create An Account' : 'Login'} />
        {/* {!signup && <ForgotPassword />} */}
      </form>
      <SignupOrLogin signup={signup} setSignup={setSignup} />
    </div>
  );
};

export default LoginForm;

const Header = ({ signup }) => {
  return (
    <div id='login-header' className='item'>
      <WithIcon icon={icons.logo}>
        <h1>{signup ? 'Create an' : 'Login to your'} account</h1>
      </WithIcon>
    </div>
  );
};

const SignupOrLogin = ({ signup, setSignup }) => {
  return (
    <div id='signup-or-login'>
      <p>{signup ? 'Already' : "Don't"} have an account?</p>
      {signup ? (
        <h2 onClick={() => setSignup(false)}>Login</h2>
      ) : (
        <h2 onClick={() => setSignup(true)}>Sign Up</h2>
      )}
    </div>
  );
};

const forgotPassword = () => {
  console.log('forgot password');
};

const ForgotPassword = () => {
  return (
    <p className='small'>
      Forgot your password?{' '}
      <span className='small' onClick={forgotPassword}>
        Click here
      </span>
    </p>
  );
};
