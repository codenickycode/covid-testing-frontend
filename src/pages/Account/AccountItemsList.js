import React from 'react';
import AccountItem from './AccountItem.js';

const items = {
  name: [
    { type: 'text', label: 'First', key: 'firstName' },
    { type: 'text', label: 'Last', key: 'lastName' },
  ],
  address: [
    { type: 'text', label: 'Street', key: 'street' },
    { type: 'text', label: 'City', key: 'city' },
    { type: 'text', label: 'State', key: 'state' },
    { type: 'text', label: 'Zip', key: 'zip' },
  ],
  phone: [{ type: 'tel', label: 'Phone', key: 'phone' }],
  dob: [{ type: 'date', label: 'Date of Birth', key: 'dob' }],
  email: [{ type: 'email', label: 'Email', key: 'email' }],
  password: [
    { type: 'password', label: 'Current Password', key: 'currentPassword' },
    { type: 'password', label: 'New Password', key: 'newPassword' },
    {
      type: 'password',
      label: 'Confirm New Password',
      key: 'confirmNewPassword',
    },
  ],
  insurance: [
    { type: 'text', label: 'Provider', key: 'provider' },
    { type: 'text', label: 'ID', key: 'id' },
  ],
  emergency_contact: [
    { type: 'text', label: 'Name', key: 'name' },
    { type: 'tel', label: 'Phone', key: 'phone' },
    { type: 'text', label: 'Relation', key: 'relation' },
  ],
};

const AccountItemsList = () => {
  return (
    <div id='account-items'>
      <AccountItem title='Name' field='name' items={items.name} />
      <AccountItem title='Address' field='address' items={items.address} />
      <AccountItem title='Phone' field='phone' items={items.phone} />
      <AccountItem title='Date of Birth' field='dob' items={items.dob} />
      <AccountItem title='Email' field='email' items={items.email} />
      <AccountItem title='Password' field='password' items={items.password} />
      <AccountItem
        title='Insurance'
        field='insurance'
        items={items.insurance}
      />
      <AccountItem
        title='Emergency Contact'
        field='emergency_contact'
        items={items.emergency_contact}
      />
    </div>
  );
};

export default AccountItemsList;
