import React from 'react';
import { ReactComponent as CreateAccount } from '../../../img/createAccount.svg';
import * as icons from '../../../icons';
import { Button, PWRequirements, WithIcon, Input } from '../../../components';

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
        <Button
          type='submit'
          label={signup ? 'Create An Account' : 'Sign In'}
        />
        {!signup && <ForgotPassword />}
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
    <>
      <p>{signup ? 'Already' : "Don't"} have an account?</p>
      {signup ? (
        <Button label='Login' onClick={() => setSignup(false)} />
      ) : (
        <Button label='Sign Up' onClick={() => setSignup(true)} />
      )}
    </>
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
