import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
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
