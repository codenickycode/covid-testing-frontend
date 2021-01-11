import React, { useEffect, useContext } from 'react';
import {
  UpdateAccountHeader,
  GetName,
  useSetContext,
} from '../../Providers/providers.js';
import dayjs from 'dayjs';

let greeting = '';

const AccountHeader = () => {
  const name = useContext(GetName);
  const updateAccountHeader = useContext(UpdateAccountHeader);
  const { setUpdateAccountHeader } = useSetContext();

  useEffect(() => {
    if (updateAccountHeader) {
      const now = new dayjs();
      const time =
        now.$H > 3 && now.$H < 12
          ? 'morning'
          : now.$H < 17
          ? 'afternoon'
          : 'evening';
      greeting = `Good ${time}${name.firstName ? `, ${name.firstName}!` : '!'}`;
      setUpdateAccountHeader(false);
    }
  }, [updateAccountHeader, setUpdateAccountHeader, name]);

  return (
    <div id='account-top'>
      <img src='#' alt='User' />
      <h1>{greeting}</h1>
    </div>
  );
};

export default AccountHeader;
