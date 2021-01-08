import React from 'react';
import AccountItem from './AccountItem.js';

const AccountItemsList = () => {
  const name = [
    { type: 'text', label: 'First', key: 'firstName' },
    { type: 'text', label: 'Last', key: 'lastName' },
  ];
  const address = [
    { type: 'text', label: 'Street', key: 'street' },
    { type: 'text', label: 'City', key: 'city' },
    { type: 'text', label: 'State', key: 'state' },
    { type: 'text', label: 'Zip', key: 'zip' },
  ];
  const phone = [{ type: 'tel', label: 'Phone', key: 'phone' }];
  const dob = [{ type: 'date', label: 'Date of Birth', key: 'dob' }];
  const email = [{ type: 'email', label: 'Email', key: 'email' }];
  const password = [
    { type: 'password', label: 'Current Password', key: 'currentPassword' },
    { type: 'password', label: 'New Password', key: 'newPassword' },
  ];
  const insurance = [
    { type: 'text', label: 'Provider', key: 'provider' },
    { type: 'text', label: 'ID', key: 'id' },
  ];
  const emergency_contact = [
    { type: 'text', label: 'Name', key: 'name' },
    { type: 'tel', label: 'Phone', key: 'phone' },
    { type: 'text', label: 'Relation', key: 'relation' },
  ];

  return (
    <div id='account-items'>
      <AccountItem field='Name' update='name' sub='' items={name} />
      <AccountItem
        field='Address'
        update='address'
        sub='address'
        items={address}
      />
      <AccountItem field='Phone' update='phone' sub='' items={phone} />
      <AccountItem field='Date of Birth' update='dob' sub='' items={dob} />
      <AccountItem field='Email' update='email' sub='' items={email} />
      <AccountItem field='Password' update='password' sub='' items={password} />
      <AccountItem
        field='Insurance'
        update='insurance'
        sub='insurance'
        items={insurance}
      />
      <AccountItem
        field='Emergency Contact'
        update='emergency_contact'
        sub='emergency_contact'
        items={emergency_contact}
      />
    </div>
  );
};

export default AccountItemsList;
