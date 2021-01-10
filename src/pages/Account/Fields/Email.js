import React, { useContext } from 'react';
import { GetEmail, SetEmail } from '../../../Providers/providers.js';
import AccountItem from '../AccountItem.js';

const Email = () => {
  const email = useContext(GetEmail);
  const setEmail = useContext(SetEmail);

  const items = [{ type: 'email', label: 'Email', key: 'email' }];

  return (
    <AccountItem
      title='Email'
      field='email'
      items={items}
      input={email}
      setContext={setEmail}
    />
  );
};

export default Email;
