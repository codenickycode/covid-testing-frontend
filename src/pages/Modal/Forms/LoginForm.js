import React, { useState } from 'react';

const validPassword = (password) => {
  return password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/);
};

const LoginForm = ({ submit, setError }) => {
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
      if (!validPassword(password)) return setError('Invalid password');
      if (password !== confirmation)
        return setError("Confirmation doesn't match");
      setError('');
      submit('register', email, password);
    } else {
      submit('login', email, password);
    }
  };

  const forgotPassword = () => {
    console.log('forgot password');
  };

  return (
    <div className='login'>
      {signup ? (
        <>
          <h1>Create an account with CityMD</h1>
          <p>Book appointments smoothly</p>
        </>
      ) : (
        <h1>Login to your account</h1>
      )}
      <form id='form-signup' className='form' onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          autoFocus
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email address'
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={inputPassword}
          placeholder={signup ? 'Create your password' : 'Enter your password'}
        />
        {signup && (
          <>
            <label htmlFor='confirmation'>Confirm</label>
            <input
              type='password'
              name='confirmation'
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder='Confirm your password'
            />
          </>
        )}
        <button type='submit'>{signup ? 'Create An Account' : 'Login'}</button>
        {!signup && (
          <p>
            Forgot your password?{' '}
            <span onClick={forgotPassword}>Click here</span>
          </p>
        )}
      </form>
      {signup && (
        <>
          <p>Already have an account?</p>
          <button onClick={() => setSignup(false)}>Login</button>
        </>
      )}
    </div>
  );
};

export default LoginForm;
