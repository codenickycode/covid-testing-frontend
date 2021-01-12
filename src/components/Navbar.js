import React, { useContext } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import {
  GetAppContext,
  useSetAllAppContext,
  INIT_APP_CONTEXT,
} from '../Providers/AppContextProvider.js';
import {
  GetEmail,
  useSetAllAccountContext,
  INIT_ACCOUNT_CONTEXT,
} from '../Providers/AccountContextProvider.js';

const Navbar = () => {
  const history = useHistory();

  const { loggedIn, navDisabled } = useContext(GetAppContext);
  const email = useContext(GetEmail);
  const setAllAppContext = useSetAllAppContext();
  const setAllAccountContext = useSetAllAccountContext();

  const logout = async () => {
    try {
      const res = await axios.get('/common/logout');
      console.log(res.data);
    } catch (e) {
      console.log(e);
      // const error = e.hasOwnProperty('response') ? e.response.data : e.message;
    } finally {
      setAllAppContext(INIT_APP_CONTEXT);
      setAllAccountContext(INIT_ACCOUNT_CONTEXT);
      history.push('/');
    }
  };

  return (
    <>
      <div id='loggedIn-display' className='error'>
        {loggedIn ? 'Logged in.' : 'Not logged in.'}
      </div>
      <div id='email-display' className='error'>
        {email.email || 'No email.'}
      </div>
      <button onClick={logout}>Logout</button>
      <nav className='navbar'>
        <ul className='nav-ul'>
          <Link to={navDisabled ? '#' : '/account'}>
            <li className={navDisabled ? 'nav-li navDisabled' : 'nav-li'}>
              Account
            </li>
          </Link>
          <Link to={navDisabled ? '#' : '/appointments'}>
            <li className={navDisabled ? 'nav-li navDisabled' : 'nav-li'}>
              Appointments
            </li>
          </Link>
          <Link to={navDisabled ? '#' : '/settings'}>
            <li className={navDisabled ? 'nav-li navDisabled' : 'nav-li'}>
              Settings
            </li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
