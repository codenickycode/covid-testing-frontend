import React, { useContext } from 'react';
import { GetInsurance, SetInsurance } from '../../../Providers/providers.js';
import AccountItem from '../AccountItem.js';

const Insurance = () => {
  const insurance = useContext(GetInsurance);
  const setInsurance = useContext(SetInsurance);

  const items = [
    { type: 'text', label: 'Provider', key: 'provider' },
    { type: 'text', label: 'ID', key: 'id' },
  ];

  return (
    <AccountItem
      title='Insurance'
      field='insurance'
      items={items}
      input={insurance}
      setContext={setInsurance}
    />
  );
};

export default Insurance;
