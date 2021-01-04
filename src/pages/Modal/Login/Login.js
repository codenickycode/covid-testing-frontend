import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../ContextProvider.js';

const validPassword = (password) => {
  return password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/);
};

const Registering = () => <h1>Registering...</h1>;

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [signup, setSignup] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [invalid, setInvalid] = useState('');
  const [registering, setRegistering] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');

  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validPassword(password)) return setInvalid('Invalid password');
    if (password !== confirmation)
      return setInvalid("Confirmation doesn't match");
    registerUser(email, password);
  };

  const registerUser = async (email, password) => {
    try {
      setRegistering(true);
      const response = await axios.post(
        'http://localhost:8000/common/register',
        {
          email,
          password,
        }
      );
      setInvalid('');
      setShowInfo(true);
    } catch (e) {
      const error = e.response.data || e.message;
      setInvalid(error);
    } finally {
      setRegistering(false);
    }
  };

  const forgotPassword = () => {
    console.log('forgot password');
  };

  const confirm = (e) => {
    e.preventDefault();
    console.log('confirming!');
  };

  return registering ? (
    <Registering />
  ) : (
    <div className='login'>
      {showInfo ? (
        <>
          <h1>Before confirming your appointment</h1>
          <p>We need a little info</p>
          <form id='form-reg-info' className='form' onSubmit={confirm}>
            <label htmlFor='name'>Full Name</label>
            <input
              autoFocus
              type='text'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor='phone'>Phone</label>
            <input
              type='tel'
              name='phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor='dob'>Date Of Birth</label>
            <input
              type='date'
              name='dob'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button type='submit'>Confirm</button>
          </form>
        </>
      ) : signup ? (
        <>
          <h1>Create an account with CityMD</h1>
          <p>Book appointments smoothly</p>
        </>
      ) : (
        <h1>Login to your account</h1>
      )}
      {invalid && <h2>{invalid}</h2>}
      <form id='form-signup' className='form' onSubmit={submit}>
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

export default Login;
