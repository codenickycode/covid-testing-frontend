import React, { useContext } from 'react';
import dayjs from 'dayjs';
import { App } from '../../Providers/Context';

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
    <h1>
      <span className='logo'></span>
      {`Good ${time}${headerName ? `, ${headerName}!` : '!'}`}
    </h1>
  );
};

export default AccountHeader;
