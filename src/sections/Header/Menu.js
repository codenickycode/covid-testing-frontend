import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu({ toggleMenu }) {
  return (
    <div id='menu' className='flex-col' onClick={toggleMenu}>
      <Link className='header-link' to='/'>
        <h1>Welcome</h1>
      </Link>
      <Link className='header-link' to='/search/form' onClick={toggleMenu}>
        <h1>New Appointment</h1>
      </Link>
      <Link className='header-link' to='/information' onClick={toggleMenu}>
        <h1>Information</h1>
      </Link>
    </div>
  );
}
