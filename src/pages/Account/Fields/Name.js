import React, { useContext } from 'react';
import { GetName, SetName } from '../../../Providers/providers.js';
import AccountItem from '../AccountItem.js';

const nameItems = [
  { type: 'text', label: 'First', key: 'firstName' },
  { type: 'text', label: 'Last', key: 'lastName' },
];

const Name = () => {
  const name = useContext(GetName);
  const setName = useContext(SetName);

  console.log(name);

  return (
    <AccountItem
      title='Name'
      preview={`${name.firstName} ${name.lastName}`}
      field='name'
      setField={setName}
      items={nameItems}
      inputs={name}
    />
  );
};

export default Name;
