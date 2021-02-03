import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import dayjs from 'dayjs';
import { App } from '../../Providers/Context';
import { AccountItemsList } from './List';
import { Page } from '../../components';
import { ReactComponent as LogoIcon } from '../../icons/Logo.svg';
import { getSS } from '../../tools/storage';

export default function Account() {
  const user = getSS('app').user;
  return !user ? (
    <Redirect to='/gateway/account' />
  ) : (
    <Page id='account'>
      <AccountHeader />
      <AccountItemsList />
    </Page>
  );
}

const AccountHeader = () => {
  const { headerName } = useContext(App);

  const now = new dayjs();
  const time =
    now.$H > 3 && now.$H < 12
      ? 'morning'
      : now.$H < 17
      ? 'afternoon'
      : 'evening';

  return (
    <div id='account-header'>
      <div className='with-icon'>
        <LogoIcon />
        <h1>{`Good ${time}${headerName ? `, ${headerName}!` : '!'}`}</h1>
      </div>
    </div>
  );
};
