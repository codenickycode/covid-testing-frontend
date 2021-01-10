import React, { useEffect, useContext } from 'react';
import {
  GetName,
  SetUpdateAccountHeader,
  UpdateAccountHeader,
} from '../../Providers/providers.js';
import dayjs from 'dayjs';

let greeting = '';

const AccountHeader = () => {
  const name = useContext(GetName);
  const update = useContext(UpdateAccountHeader);
  const setUpdate = useContext(SetUpdateAccountHeader);

  useEffect(() => {
    if (update) {
      const now = new dayjs();
      const time =
        now.$H > 3 && now.$H < 12
          ? 'morning'
          : now.$H < 17
          ? 'afternoon'
          : 'evening';
      greeting = `Good ${time}${name.firstName ? `, ${name.firstName}!` : '!'}`;
      setUpdate(false);
    }
  }, [update, setUpdate, name]);

  return (
    <div id='account-top'>
      <img src='#' alt='User' />
      <h1>{greeting}</h1>
    </div>
  );
};

export default AccountHeader;
