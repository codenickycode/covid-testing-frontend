import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { App } from '../../Providers/Context';
import { ReactComponent as AccountIcon } from '../../icons/account.svg';
import { ReactComponent as AppointmentsIcon } from '../../icons/appointments.svg';
import { ReactComponent as SettingsIcon } from '../../icons/settings.svg';

const Navbar = () => {
  const { loading, navDisabled } = useContext(App);

  return (
    <>
      <div id='footer'>
        <nav id='navbar'>
          <NavLink
            to={loading || navDisabled ? '#' : '/gateway/account'}
            className={loading || navDisabled ? 'icon disabled' : 'icon'}
            activeClassName='icon active'
          >
            <AccountIcon />
          </NavLink>

          <NavLink
            to={loading || navDisabled ? '#' : '/gateway/appointments'}
            className={loading || navDisabled ? 'icon disabled' : 'icon'}
            activeClassName='icon active'
          >
            <AppointmentsIcon />
          </NavLink>

          <NavLink
            to={loading || navDisabled ? '#' : '/gateway/settings'}
            className={loading || navDisabled ? 'icon disabled' : 'icon'}
            activeClassName='icon active'
          >
            <SettingsIcon />
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
