import React, { useEffect, useContext } from 'react';
import { GetLoggedIn, GetName } from '../../Providers/providers.js';
import dayjs from 'dayjs';

let greeting = '';

const AccountHeader = () => {
  const loggedIn = useContext(GetLoggedIn);
  const name = useContext(GetName);

  useEffect(() => {
    if (!loggedIn) return;
    const now = new dayjs();
    const time =
      now.$H > 3 && now.$H < 12
        ? 'morning'
        : now.$H < 17
        ? 'afternoon'
        : 'evening';
    greeting = `Good ${time}, ${name.firstName ? name.firstName : 'friend'}`;
  }, [loggedIn, name]);

  return (
    <div id='account-top'>
      <img src='#' alt='User' />
      <h1>{greeting}</h1>
    </div>
  );
};

export default AccountHeader;
