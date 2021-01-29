import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { App } from '../../Providers/Context.js';
import Menu from './Menu';
// import { ReactComponent as MenuIcon } from '../../icons/Menu.svg';
import { ReactComponent as ArrowIcon } from '../../icons/Arrow.svg';
import { ReactComponent as MenuIcon } from '../../icons/MenuAnimate.svg';

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const { loading, navDisabled } = useContext(App);
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
      <div id='header-main'>
        <ArrowIcon
          className={
            loading || navDisabled
              ? 'icon disabled deg180'
              : 'icon active deg180'
          }
          onClick={loading || navDisabled ? null : history.goBack}
        />

        {loading ? (
          <p className='skeleton-h1text'>Loading...</p>
        ) : (
          <h2 className='title'>{title}</h2>
        )}
        <MenuIcon className='icon v-hidden' />
        <div className={showMenu ? 'show-menu no-menu' : 'no-menu'}>
          <Menu toggleMenu={toggleMenu} />
        </div>
        <div className={showMenu ? 'menu-btn menu-btn-show' : 'menu-btn '}>
          <MenuIcon
            className={
              loading || navDisabled
                ? 'icon disabled'
                : showMenu
                ? 'icon active show-menu'
                : 'icon active'
            }
            onClick={loading || navDisabled ? null : toggleMenu}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
