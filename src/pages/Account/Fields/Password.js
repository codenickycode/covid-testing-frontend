import React, { useContext } from 'react';
import { GetPassword, SetPassword } from '../../../Providers/providers.js';
import AccountItem from '../AccountItem.js';

const Password = () => {
  const password = useContext(GetPassword);
  const setPassword = useContext(SetPassword);

  const items = [
    { type: 'password', label: 'Current Password', key: 'currentPassword' },
    { type: 'password', label: 'New Password', key: 'newPassword' },
    {
      type: 'password',
      label: 'Confirm New Password',
      key: 'confirmNewPassword',
    },
  ];

  return (
    <AccountItem
      title='Password'
      field='password'
      items={items}
      input={password}
      setContext={setPassword}
    />
  );
};

export default Password;
