import React, { useContext } from 'react';
import dayjs from 'dayjs';
import { App } from '../../Providers/Context';
import { ReactComponent as LogoIcon } from '../../icons/Logo.svg';

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

export default AccountHeader;
