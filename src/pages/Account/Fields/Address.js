import React, { useContext } from 'react';
import { GetAddress, SetAddress } from '../../../Providers/providers.js';
import AccountItem from '../AccountItem.js';

const Address = () => {
  const address = useContext(GetAddress);
  const setAddress = useContext(SetAddress);

  const items = [
    { type: 'text', label: 'Street', key: 'street' },
    { type: 'text', label: 'City', key: 'city' },
    { type: 'text', label: 'State', key: 'state' },
    { type: 'text', label: 'Zip', key: 'zip' },
  ];

  return (
    <AccountItem
      title='Address'
      field='address'
      items={items}
      input={address}
      setContext={setAddress}
    />
  );
};

export default Address;
