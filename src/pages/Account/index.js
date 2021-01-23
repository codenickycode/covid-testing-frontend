import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { App } from '../../Providers/Context';
import AccountHeader from './Header';
import AccountItem from './Item.js';

export default function Account() {
  const { user } = useContext(App);
  return !user ? (
    <Redirect to='/gateway/account' />
  ) : (
    <div id='account-div'>
      <AccountHeader />
      <AccountItemsList />
    </div>
  );
}

function AccountItemsList() {
  return (
    <div>
      <NameItem />
      <AddressItem />
      <PhoneItem />
      <DobItem />
      <EmailItem />
      <PasswordItem />
      <InsuranceItem />
      <EmergencyContactItem />
      {/* <Travel /> */}
    </div>
  );
}

const NameItem = () => {
  const items = [
    { type: 'text', label: 'First', key: 'firstName' },
    { type: 'text', label: 'Last', key: 'lastName' },
  ];
  return <AccountItem title='Name' field='name' items={items} />;
};

const AddressItem = () => {
  const items = [
    { type: 'text', label: 'Street', key: 'street' },
    { type: 'text', label: 'City', key: 'city' },
    { type: 'text', label: 'State', key: 'state' },
    { type: 'text', label: 'Zip', key: 'zip' },
  ];
  return <AccountItem title='Address' field='address' items={items} />;
};

const DobItem = () => {
  const items = [{ type: 'date', label: 'Date of Birth', key: 'dob' }];
  return <AccountItem title='Date of Birth' field='dob' items={items} />;
};

const EmailItem = () => {
  const items = [{ type: 'email', label: 'Email', key: 'email' }];
  return <AccountItem title='Email' field='email' items={items} />;
};

const EmergencyContactItem = () => {
  const items = [
    { type: 'text', label: 'Name', key: 'name' },
    { type: 'tel', label: 'Phone', key: 'phone' },
    { type: 'text', label: 'Relation', key: 'relation' },
  ];
  return (
    <AccountItem
      title='Emergency Contact'
      field='emergency_contact'
      items={items}
    />
  );
};

const InsuranceItem = () => {
  const items = [
    { type: 'text', label: 'Provider', key: 'provider' },
    { type: 'text', label: 'ID', key: 'id' },
  ];
  return <AccountItem title='Insurance' field='insurance' items={items} />;
};

const PasswordItem = () => {
  const items = [
    { type: 'password', label: 'Current Password', key: 'currentPassword' },
    { type: 'password', label: 'New Password', key: 'newPassword' },
    {
      type: 'password',
      label: 'Confirm New Password',
      key: 'confirmNewPassword',
    },
  ];
  return <AccountItem title='Password' field='password' items={items} />;
};

const PhoneItem = () => {
  const items = [{ type: 'tel', label: 'Phone', key: 'phone' }];
  return <AccountItem title='Phone' field='phone' items={items} />;
};
