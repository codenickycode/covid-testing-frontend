import React from 'react';
import Image from '../../../components/Image';
import * as icons from '../../../icons';
import {
  Button,
  PWRequirements,
  Submit,
  WithIcon,
  Input,
} from '../../../components';

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

  const LoginInstead = () => {
    return (
      <>
        <p>Already have an account?</p>
        <Button label='Login' onClick={() => setSignup(false)} />
      </>
    );
  };

  const SignupInstead = () => {
    return (
      <>
        <p>Don't have an account?</p>
        <Button label='Sign Up' onClick={() => setSignup(true)} />
      </>
    );
  };

  return (
    <div id='login-form' className='flex-col'>
      <div className='item'>
        <WithIcon icon={icons.logo}>
          {signup ? <h1>Create an account</h1> : <h1>Login to your account</h1>}
        </WithIcon>
      </div>
      {window.innerHeight > 650 && (
        <Image src='/img/png/login.png' alt='Login illustration' size='med' />
      )}
      <form onSubmit={handleSubmit}>
        <Input
          field='email'
          error={errors.email}
          value={inputs.email}
          onChange={handleInput}
          withIcon={true}
        />
        <Input
          field='password'
          error={errors.password}
          value={inputs.password}
          onChange={handleInput}
          withIcon={true}
        />
        {signup && <PWRequirements error={errors.password} />}
        {signup && (
          <Input
            field='confirmation'
            error={errors.confirmation}
            value={inputs.confirmation}
            onChange={handleInput}
            withIcon={true}
          />
        )}
        <Submit label={signup ? 'Create An Account' : 'Sign In'} />
        {!signup && <ForgotPassword />}
      </form>
      {signup ? <LoginInstead /> : <SignupInstead />}
    </div>
  );
};

export default LoginForm;
