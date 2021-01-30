import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { App, Go } from '../../Providers/Context.js';
import Menu from './Menu';
import { ReactComponent as ArrowIcon } from '../../icons/Arrow.svg';
import { ReactComponent as MenuIcon } from '../../icons/MenuAnimate.svg';

const Header = () => {
  const location = useLocation();
  const { loading, navDisabled } = useContext(App);
  const go = useContext(Go);
  const [title, setTitle] = useState('');
  const [showMenu, setShowMenu] = useState(false);

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
    setShowMenu(!showMenu);
  }

  return (
    <header id='header'>
      <div id='header-wrapper'>
        <div id='header-main'>
          <ArrowIcon
            id='back-btn'
            className={
              loading || navDisabled
                ? 'icon disabled deg180'
                : 'icon active deg180'
            }
            onClick={loading || navDisabled ? null : () => go('back')}
          />

          {loading ? (
            <p className='skeleton-h1text transition show'>Loading...</p>
          ) : (
            <h2 className='title transition show'>{title}</h2>
          )}
          <MenuIcon
            className={
              loading || navDisabled
                ? 'disabled menu-icon'
                : showMenu
                ? 'active menu-icon show-menu'
                : 'active menu-icon'
            }
            onClick={loading || navDisabled ? null : toggleMenu}
          />
        </div>
        <div className={showMenu ? 'show-menu no-menu' : 'no-menu'}>
          <Menu toggleMenu={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
