import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { App } from '../Providers/Context';
import { Go } from '../Providers/Go';
import Menu from './Menu';
import { ArrowLeft, MenuIcon } from '../icons';

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

  const toggleMenu = useCallback(() => {
    setShowMenu(!showMenu);
    const dim = document.getElementById('dim');
    if (!showMenu) {
      dim.classList.add('dim');
    } else {
      dim.classList.remove('dim');
    }
  }, [showMenu]);

  useEffect(() => {
    if (showMenu) {
      document.addEventListener('click', toggleMenu);
    }
    return () => document.removeEventListener('click', toggleMenu);
  }, [showMenu, toggleMenu]);

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
            <div id='back-btn-wrapper' onClick={arrowClick}>
              <ArrowLeft addClass={arrowClass} />
            </div>
            {loading ? (
              <p className='skeleton-h1text transition show'>Loading...</p>
            ) : (
              <h2 className='title transition show'>{title}</h2>
            )}
            <div id='menu-icon-wrapper' onClick={menuClick}>
              <MenuIcon addClass={menuClass} />
            </div>
          </div>
          <div className={showMenu ? 'show-menu no-menu' : 'no-menu'}>
            <Menu toggleMenu={toggleMenu} showMenu={showMenu} />
          </div>
          <SearchProgress
            url={url}
            addClass={location.pathname.match(/search/) ? '' : 'v-hidden'}
          />
        </div>
      </header>
      {children}
    </div>
  );
}

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

const SearchProgress = ({ url, addClass }) => {
  return (
    <div id='search-progress' className={addClass}>
      <span className={url === 'form' ? 'current' : ''}>&bull;</span>
      <span className={url === 'results' ? 'current' : ''}>&bull;</span>
      <span className={url === 'selection' ? 'current' : ''}>&bull;</span>
    </div>
  );
};
