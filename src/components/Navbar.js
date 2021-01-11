import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GetLoggedIn, GetEmail } from '../Providers/providers.js';

const Navbar = () => {
  const loggedIn = useContext(GetLoggedIn);
  const email = useContext(GetEmail);

  return (
    <>
      <div id='loggedIn-display' className='error'>
        {loggedIn || 'Not logged in.'}
      </div>
      <div id='email-display' className='error'>
        {email.email || 'No email.'}
      </div>
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
