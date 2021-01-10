import React, { useContext } from 'react';
import { GetDob, SetDob } from '../../../Providers/providers.js';
import AccountItem from '../AccountItem.js';

const Dob = () => {
  const dob = useContext(GetDob);
  const setDob = useContext(SetDob);

  const items = [{ type: 'date', label: 'Date of Birth', key: 'dob' }];

  return (
    <AccountItem
      title='Dob'
      field='dob'
      items={items}
      input={dob}
      setContext={setDob}
    />
  );
};

export default Dob;
