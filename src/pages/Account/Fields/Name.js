import React, { useContext } from 'react';
import {
  GetName,
  SetName,
  SetUpdateAccountHeader,
} from '../../../Providers/providers.js';
import AccountItem from '../AccountItem.js';

const Name = () => {
  const name = useContext(GetName);
  const setName = useContext(SetName);
  const setUpdate = useContext(SetUpdateAccountHeader);

  const setContext = (value) => {
    setName(value);
  };

  const items = [
    { type: 'text', label: 'First', key: 'firstName' },
    { type: 'text', label: 'Last', key: 'lastName' },
  ];

  return (
    <AccountItem
      title='Name'
      field='name'
      items={items}
      input={name}
      setContext={setContext}
      setUpdate={setUpdate}
    />
  );
};

export default Name;
