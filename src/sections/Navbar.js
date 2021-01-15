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
import { ReactComponent as Account } from '../icons/account.svg';
import { ReactComponent as Appointments } from '../icons/appointments.svg';
import { ReactComponent as Settings } from '../icons/settings.svg';

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
      <div className='info-footer'>
        <div className='error'>
          {loggedIn ? 'Logged in.' : 'Not logged in.'}
        </div>
        <div className='error'>{email.email || 'No email.'}</div>
        <button onClick={logout}>Logout</button>
      </div>
      <div className='footer'>
        <nav className='navbar'>
          <Link to={navDisabled ? '#' : '/account'}>
            <div className={navDisabled ? 'icon navDisabled' : 'icon'}>
              <Account />
            </div>
          </Link>
          <Link to={navDisabled ? '#' : '/appointments'}>
            <div className={navDisabled ? 'icon navDisabled' : 'icon'}>
              <Appointments />
            </div>
          </Link>
          <Link to={navDisabled ? '#' : '/settings'}>
            <div className={navDisabled ? 'icon navDisabled' : 'icon'}>
              <Settings />
            </div>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
