import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Go } from '../Providers/Go';
import * as icons from '../icons';

export default function Menu({ toggleMenu, showMenu }) {
  const go = useContext(Go);

  const handleTo = (to) => {
    if (!showMenu) return;
    go(to);
  };

  return (
    <div id='menu' className='flex-col' onClick={showMenu ? toggleMenu : null}>
      <Link
        className='header-link red'
        to='#'
        onClick={() => handleTo('/search/form')}
      >
        <div className='with-icon'>
          {icons.document}
          <h2>New Appointment</h2>
        </div>
      </Link>
      <Link className='header-link red' to='#' onClick={() => handleTo('/faq')}>
        <div className='with-icon'>
          {icons.info}
          <h2>FAQ</h2>
        </div>
      </Link>
      <Link className='header-link' to='#' onClick={() => handleTo('/account')}>
        <div className='with-icon'>
          {icons.account}
          <h2>My Account</h2>
        </div>
      </Link>
      <Link
        className='header-link'
        to='#'
        onClick={() => handleTo('/appointments')}
      >
        <div className='with-icon'>
          {icons.appointments}
          <h2>My Appointments</h2>
        </div>
      </Link>
      <Link
        className='header-link'
        to='#'
        onClick={() => handleTo('/settings')}
      >
        <div className='with-icon'>
          {icons.settings}
          <h2>My Settings</h2>
        </div>
      </Link>
    </div>
  );
}
