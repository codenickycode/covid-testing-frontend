import React, { useEffect, useContext } from 'react';
import { User } from '../../Providers/User.js';
import dayjs from 'dayjs';

let greeting = '';

const AccountHeader = () => {
  const user = useContext(User);

  useEffect(() => {
    if (!user) return;
    const now = new dayjs();
    const time =
      now.$H > 3 && now.$H < 12
        ? 'morning'
        : now.$H < 17
        ? 'afternoon'
        : 'evening';
    greeting = `Good ${time}, ${user.firstName ? user.firstName : 'friend'}`;
  }, [user]);

  return (
    <div id='account-top'>
      <img src='#' alt='User' />
      <h1>{greeting}</h1>
    </div>
  );
};

export default AccountHeader;
