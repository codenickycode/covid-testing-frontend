import React, { useContext } from 'react';
import { GetTravel, SetTravel } from '../../../Providers/providers.js';
import AccountItem from '../AccountItem.js';

const Travel = () => {
  const travel = useContext(GetTravel);
  const setTravel = useContext(SetTravel);

  const items = [];

  return (
    <AccountItem
      title='Travel'
      field='travel'
      items={items}
      input={travel}
      setContext={setTravel}
    />
  );
};

export default Travel;
