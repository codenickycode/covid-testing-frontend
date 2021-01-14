import React, { useContext } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import {
  App,
  NavDisabled,
  SetApp,
  SetInfo,
  INIT_APP_STATE,
  INIT_INFO_STATE,
} from '../Providers/ContextProvider.js';
import {
  Email,
  useSetAllAccount,
  INIT_ACCOUNT_STATE,
} from '../Providers/AccountProvider.js';
import { useTryCatchFinally } from '../tools/useTryCatchFinally.js';

const Navbar = () => {
  const history = useHistory();
  const tryCatchFinally = useTryCatchFinally();
  const { loggedIn } = useContext(App);
  const navDisabled = useContext(NavDisabled);
  const email = useContext(Email);
  const setApp = useContext(SetApp);
  const setInfo = useContext(SetInfo);
  const setAllAccount = useSetAllAccount();

  const logout = () => {
    history.push('/');
    tryCatchFinally(tryFunc, undefined, undefined, finallyFunc);
    async function tryFunc() {
      const res = await axios.get('/common/logout');
      console.log(res.data);
    }
    function finallyFunc() {
      setApp(INIT_APP_STATE);
      setInfo(INIT_INFO_STATE);
      setAllAccount(INIT_ACCOUNT_STATE);
    }
  };

  return (
    <>
      <div id='loggedIn-display' className='error'>
        {loggedIn ? 'Logged in.' : 'Not logged in.'}
      </div>
      <div id='email-display' className='error'>
        {email.email || 'No email.'}
      </div>
      <button onClick={logout}>Logout</button>
      <nav className='navbar'>
        <ul className='nav-ul'>
          <Link to={navDisabled ? '#' : '/account'}>
            <li className={navDisabled ? 'nav-li navDisabled' : 'nav-li'}>
              Account
            </li>
          </Link>
          <Link to={navDisabled ? '#' : '/appointments'}>
            <li className={navDisabled ? 'nav-li navDisabled' : 'nav-li'}>
              Appointments
            </li>
          </Link>
          <Link to={navDisabled ? '#' : '/settings'}>
            <li className={navDisabled ? 'nav-li navDisabled' : 'nav-li'}>
              Settings
            </li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
