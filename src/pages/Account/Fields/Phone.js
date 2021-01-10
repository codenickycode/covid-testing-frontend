import React, { useContext } from 'react';
import { GetPhone, SetPhone } from '../../../Providers/providers.js';
import AccountItem from '../AccountItem.js';

const Phone = () => {
  const phone = useContext(GetPhone);
  const setPhone = useContext(SetPhone);

  const items = [{ type: 'tel', label: 'Phone', key: 'phone' }];

  return (
    <AccountItem
      title='Phone'
      field='phone'
      items={items}
      input={phone}
      setContext={setPhone}
    />
  );
};

export default Phone;
