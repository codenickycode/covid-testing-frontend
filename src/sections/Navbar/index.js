import React, { useContext } from 'react';
import axios from 'axios';
import { useHistory, NavLink } from 'react-router-dom';
import {
  App,
  NavDisabled,
  SetApp,
  SetInfo,
  INIT_APP_STATE,
  INIT_INFO_STATE,
  SetRefresh,
} from '../../Providers/Context';
import {
  Email,
  useSetAllAccount,
  INIT_ACCOUNT_STATE,
} from '../../Providers/Account';
import { Preferences, SetPreferences } from '../../Providers/Preferences';
import { useTryCatchFinally } from '../../tools/useTryCatchFinally.js';
import { ReactComponent as AccountIcon } from '../../icons/account.svg';
import { ReactComponent as AppointmentsIcon } from '../../icons/appointments.svg';
import { ReactComponent as SettingsIcon } from '../../icons/settings.svg';

const Navbar = () => {
  const history = useHistory();
  const tryCatchFinally = useTryCatchFinally();
  const { loggedIn } = useContext(App);
  const navDisabled = useContext(NavDisabled);
  const { remember } = useContext(Preferences);
  const email = useContext(Email);
  const setApp = useContext(SetApp);
  const setInfo = useContext(SetInfo);
  const setRefresh = useContext(SetRefresh);
  const setAllAccount = useSetAllAccount();
  const { setPreferences } = useContext(SetPreferences);

  return (
    <>
      <div className='footer'>
        <nav className='navbar'>
          <NavLink
            to={navDisabled ? '#' : loggedIn ? '/account' : '/gateway/account'}
            className={navDisabled ? 'icon-disabled' : 'icon'}
            activeClassName='icon-active'
          >
            <AccountIcon />
          </NavLink>

          <NavLink
            to={
              navDisabled
                ? '#'
                : loggedIn
                ? '/appointments'
                : '/gateway/appointments'
            }
            className={navDisabled ? 'icon-disabled' : 'icon'}
            activeClassName='icon-active'
          >
            <AppointmentsIcon />
          </NavLink>

          <NavLink
            to={
              navDisabled ? '#' : loggedIn ? '/settings' : '/gateway/settings'
            }
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
