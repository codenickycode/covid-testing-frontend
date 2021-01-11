import React, { useContext } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { GetLoggedIn, GetEmail } from '../Providers/providers.js';

const Navbar = () => {
  const history = useHistory();
  const loggedIn = useContext(GetLoggedIn);
  const email = useContext(GetEmail);

  const logout = async () => {
    try {
      const res = await axios.get('/common/logout');
      console.log(res.data);
    } catch (e) {
      console.log(e);
      // const error = e.hasOwnProperty('response') ? e.response.data : e.message;
    } finally {
      localStorage.clear();
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
          <Link to='/account'>
            <li className='nav-li'>Account</li>
          </Link>
          <Link to='/appointments'>
            <li className='nav-li'>Appointments</li>
          </Link>
          <Link to='/settings'>
            <li className='nav-li'>Settings</li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
