import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { NavDisabled } from '../../Providers/Context';
import { ReactComponent as AccountIcon } from '../../icons/account.svg';
import { ReactComponent as AppointmentsIcon } from '../../icons/appointments.svg';
import { ReactComponent as SettingsIcon } from '../../icons/settings.svg';

const Navbar = () => {
  const navDisabled = useContext(NavDisabled);

  return (
    <>
      <div className='footer'>
        <nav className='navbar'>
          <NavLink
            to={navDisabled ? '#' : '/gateway/account'}
            className={navDisabled ? 'icon-disabled' : 'icon'}
            activeClassName='icon-active'
          >
            <AccountIcon />
          </NavLink>

          <NavLink
            to={navDisabled ? '#' : '/gateway/appointments'}
            className={navDisabled ? 'icon-disabled' : 'icon'}
            activeClassName='icon-active'
          >
            <AppointmentsIcon />
          </NavLink>

          <NavLink
            to={navDisabled ? '#' : '/gateway/settings'}
            className={navDisabled ? 'icon-disabled' : 'icon'}
            activeClassName='icon-active'
          >
            <SettingsIcon />
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
