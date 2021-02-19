import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { getLS } from '../../tools/storage';
import { App } from '../../Providers/Context';
import { Go } from '../../Providers/Go';
import Menu from './Menu';
import { ArrowLeft, MenuIcon } from '../../icons';

export default function Header({ children }) {
  const location = useLocation();
  const url = location.pathname.match(/\w*$/)[0];
  const { loading, navDisabled } = useContext(App);
  const go = useContext(Go);
  const [title, setTitle] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setTitle(getTitle(url));
  }, [url]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    const dim = document.getElementById('dim');
    if (!showMenu) {
      dim.classList.add('dim');
    } else {
      dim.classList.remove('dim');
    }
  };

  const arrowClass = loading || navDisabled ? 'disabled' : '';
  const arrowClick = loading || navDisabled ? null : () => go('back');
  const menuClass =
    loading || navDisabled
      ? 'disabled menu-icon'
      : showMenu
      ? 'active menu-icon show-menu'
      : 'active menu-icon';
  const menuClick = loading || navDisabled ? null : toggleMenu;
  return (
    <div>
      <header id='header'>
        <div id='header-wrapper'>
          <div id='header-main'>
            <ArrowLeft
              id='back-btn'
              addClass={arrowClass}
              onClick={arrowClick}
            />
            <HeaderMiddle
              loading={loading}
              title={title}
              location={location}
              url={url}
            />
            <div id='header-dummy'>
              <ArrowLeft />
            </div>
            <div id='menu-icon-wrapper' onClick={menuClick}>
              <MenuIcon addClass={menuClass} />
            </div>
          </div>
          <div className={showMenu ? 'show-menu no-menu' : 'no-menu'}>
            <Menu toggleMenu={toggleMenu} showMenu={showMenu} />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

const HeaderMiddle = ({ loading, title, location, url }) => {
  return (
    <div id='header-middle'>
      <div className='header-middle-dummy'></div>
      {loading ? (
        <p className='skeleton-h1text transition show'>Loading...</p>
      ) : (
        <h2 className='title transition show'>{title}</h2>
      )}
      {location.pathname.match(/search/) ? (
        <SearchProgress url={url} />
      ) : (
        <div className='header-middle-dummy'></div>
      )}
    </div>
  );
};

const getTitle = (url) => {
  switch (url) {
    case '':
      return 'Welcome';
    case 'form':
      return 'Search';
    case 'results':
      return 'Next Available';
    case 'selection':
      return 'Book An Appointment';
    case 'appointments':
      return 'My Appointments';
    case 'account':
      return 'My Account';
    case 'settings':
      return 'My Settings';
    case 'faq':
      return 'FAQ';
    default:
      return 'Covid-19 Testing';
  }
};

const SearchProgress = ({ url }) => {
  const black = getLS('dark') ? '⚪' : '⚫';
  const white = getLS('dark') ? '⚫' : '⚪';
  return (
    <div id='search-progress'>
      <span>{url === 'form' ? black : white}</span>
      <span>{url === 'results' ? black : white}</span>
      <span>{url === 'selection' ? black : white}</span>
    </div>
  );
};
