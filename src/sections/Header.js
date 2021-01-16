import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { NavDisabled } from '../Providers/ContextProvider.js';
import { ReactComponent as InfoIcon } from '../icons/info.svg';
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const navDisabled = useContext(NavDisabled);
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

  return (
    <>
      <header className='header'>
        <div
          className={navDisabled ? 'icon-disabled' : 'icon'}
          onClick={navDisabled ? null : history.goBack}
        >
          <ArrowIcon />
        </div>
        <h3 className='title'>{title}</h3>

        <NavLink
          to={navDisabled ? '#' : '/information'}
          className={navDisabled ? 'icon-disabled' : 'icon'}
          activeClassName='icon-active'
        >
          <InfoIcon />
        </NavLink>
      </header>
    </>
  );
};

export default Header;
