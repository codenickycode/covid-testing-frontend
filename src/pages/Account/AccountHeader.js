import React, { useEffect, useContext } from 'react';
import {
  GetAppContext,
  SetAppContext,
} from '../../Providers/AppContextProvider.js';
import { GetName } from '../../Providers/AccountContextProvider.js';
import dayjs from 'dayjs';

let greeting = '';

const AccountHeader = () => {
  const name = useContext(GetName);
  const { updateAH } = useContext(GetAppContext);
  const { setUpdateAH } = useContext(SetAppContext);

  useEffect(() => {
    if (updateAH) {
      const now = new dayjs();
      const time =
        now.$H > 3 && now.$H < 12
          ? 'morning'
          : now.$H < 17
          ? 'afternoon'
          : 'evening';
      greeting = `Good ${time}${name.firstName ? `, ${name.firstName}!` : '!'}`;
      setUpdateAH(false);
    }
  }, [updateAH, setUpdateAH, name]);

  return (
    <div id='account-top'>
      <img src='#' alt='User' />
      <h1>{greeting}</h1>
    </div>
  );
};

export default AccountHeader;
