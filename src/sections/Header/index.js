import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { App } from '../../Providers/Context.js';
import { ReactComponent as MenuIcon } from '../../icons/menu.svg';
import { ReactComponent as ArrowIcon } from '../../icons/Arrow.svg';

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const { loading, navDisabled } = useContext(App);
  const [title, setTitle] = useState('');

  useEffect(() => {
    switch (location.pathname.match(/\w*$/)[0]) {
      case '':
        setTitle('Welcome');
        break;
      case 'form':
        setTitle('Search');
        break;
      case 'results':
        setTitle('Locations');
        break;
      case 'selection':
        setTitle('Book An Appointment');
        break;
      case 'appointments':
        setTitle('Appointments');
        break;
      case 'account':
        setTitle('Profile');
        break;
      case 'settings':
        setTitle('Settings');
        break;
      case 'information':
        setTitle('Information');
        break;
      default:
        setTitle('Covid-19 Testing');
    }
  }, [location]);

  function toggleMenu() {
    document.querySelector('#menu').classList.toggle('show-menu');
  }

  return (
    <header id='header'>
      <div
        className={loading || navDisabled ? 'icon disabled' : 'icon active'}
        onClick={loading || navDisabled ? null : history.goBack}
      >
        <ArrowIcon />
      </div>

      {loading ? (
        <div className='skeleton-h1text'>Loading...</div>
      ) : (
        <h3 className='title'>{title}</h3>
      )}

      <MenuIcon
        className={loading || navDisabled ? 'icon disabled' : 'icon active'}
        onClick={loading || navDisabled ? null : toggleMenu}
      />
    </header>
  );
};

export default Header;
