import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { App } from '../../Providers/Context';
import { Go } from '../../Providers/Go';
import {
  AccountIcon,
  AppointmentsIcon,
  ArrowDown,
  ArrowUp,
  SettingsIcon,
} from '../../icons';
const Navbar = () => {
  const { loading, navDisabled } = useContext(App);
  const go = useContext(Go);

  const [expanded, setExpanded] = useState(false);

  return (
    <div id='footer-wrapper' className={expanded ? 'expanded' : ''}>
      <div id='footer-expand' onClick={() => setExpanded(!expanded)}>
        {expanded ? <ArrowDown /> : <ArrowUp />}
      </div>
      <div id='footer'>
        <nav id='navbar'>
          <NavLink
            to={loading || navDisabled ? '#' : '/account'}
            className={
              loading || navDisabled
                ? 'navbar-disabled nav-link'
                : 'navbar-default nav-link'
            }
            activeClassName='navbar-active nav-link'
            onClick={null}
          >
            <AccountIcon />
          </NavLink>

          <NavLink
            to={loading || navDisabled ? '#' : '/appointments'}
            className={
              loading || navDisabled
                ? 'navbar-disabled nav-link'
                : 'navbar-default nav-link'
            }
            activeClassName='navbar-active nav-link'
          >
            <AppointmentsIcon />
          </NavLink>

          <NavLink
            to={loading || navDisabled ? '#' : '/settings'}
            className={
              loading || navDisabled
                ? 'navbar-disabled nav-link'
                : 'navbar-default nav-link'
            }
            activeClassName='navbar-active nav-link'
          >
            <SettingsIcon />
          </NavLink>
        </nav>
        <div id='nav-click'>
          <div
            id='account-link'
            className='real-link'
            onClick={() => go('/account')}
          ></div>
          <div
            id='appointments-link'
            className='real-link'
            onClick={() => go('/appointments')}
          ></div>
          <div
            id='settings-link'
            className='real-link'
            onClick={() => go('/settings')}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
