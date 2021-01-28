import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { App } from '../../Providers/Context';
import { ReactComponent as AccountIcon } from '../../icons/Account.svg';
import { ReactComponent as AppointmentsIcon } from '../../icons/Appointments.svg';
import { ReactComponent as SettingsIcon } from '../../icons/Settings.svg';

const Navbar = () => {
  const { loading, navDisabled } = useContext(App);

  return (
    <>
      <div id='footer'>
        <nav id='navbar'>
          <NavLink
            to={loading || navDisabled ? '#' : '/account'}
            className={
              loading || navDisabled ? 'navbar-disabled' : 'navbar-default'
            }
            activeClassName='navbar-active'
          >
            <AccountIcon />
          </NavLink>

          <NavLink
            to={loading || navDisabled ? '#' : '/appointments'}
            className={
              loading || navDisabled ? 'navbar-disabled' : 'navbar-default'
            }
            activeClassName='navbar-active'
          >
            <AppointmentsIcon />
          </NavLink>

          <NavLink
            to={loading || navDisabled ? '#' : '/settings'}
            className={
              loading || navDisabled ? 'navbar-disabled' : 'navbar-default'
            }
            activeClassName='navbar-active'
          >
            <SettingsIcon />
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
