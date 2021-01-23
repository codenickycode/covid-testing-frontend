import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AccountHeader from './Header';
import AccountItem from './Item.js';

export default function Account() {
  const { user } = useContext(App);
  return !user ? (
    <Redirect to='/gateway/account' />
  ) : (
    <div id='account-div'>
      <AccountHeader />
      <AccountItemsList user={user} />
    </div>
  );
}

function AccountItemsList({ user }) {
  return (
    <div>
      <NameItem user={user} />
      <AddressItem user={user} />
      <PhoneItem user={user} />
      <DobItem user={user} />
      <EmailItem user={user} />
      <PasswordItem user={user} />
      <InsuranceItem user={user} />
      <EmergencyContactItem user={user} />
      {/* <Travel /> */}
    </div>
  );
}

const NameItem = ({ user }) => {
  const { name = {} } = user;
  const items = [
    { type: 'text', label: 'First', key: 'firstName' },
    { type: 'text', label: 'Last', key: 'lastName' },
  ];
  return (
    <AccountItem
      title='Name'
      field='name'
      items={items}
      initial={name}
      setContext={setName}
      setHeader={setHeaderName}
    />
  );
};

const AddressItem = ({ user }) => {
  const { address = {} } = user;
  const items = [
    { type: 'text', label: 'Street', key: 'street' },
    { type: 'text', label: 'City', key: 'city' },
    { type: 'text', label: 'State', key: 'state' },
    { type: 'text', label: 'Zip', key: 'zip' },
  ];
  return (
    <AccountItem
      title='Address'
      field='address'
      items={items}
      initial={address}
      setContext={setAddress}
    />
  );
};

const DobItem = ({ user }) => {
  const { dob = {} } = user;
  const items = [{ type: 'date', label: 'Date of Birth', key: 'dob' }];
  return (
    <AccountItem
      title='Date of Birth'
      field='dob'
      items={items}
      initial={dob}
      setContext={setDob}
    />
  );
};

const EmailItem = ({ user }) => {
  const { email = {} } = user;
  const items = [{ type: 'email', label: 'Email', key: 'email' }];
  return (
    <AccountItem
      title='Email'
      field='email'
      items={items}
      initial={email}
      setContext={setEmail}
    />
  );
};

const EmergencyContactItem = ({ user }) => {
  const { emergency_contact = {} } = user;
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
      initial={emergency_contact}
      setContext={setEmergencyContact}
    />
  );
};

const InsuranceItem = ({ user }) => {
  const { insurance = {} } = user;
  const items = [
    { type: 'text', label: 'Provider', key: 'provider' },
    { type: 'text', label: 'ID', key: 'id' },
  ];
  return (
    <AccountItem
      title='Insurance'
      field='insurance'
      items={items}
      initial={insurance}
      setContext={setInsurance}
    />
  );
};

const PasswordItem = ({ user }) => {
  const { password = {} } = user;
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
      initial={password}
      setContext={setPassword}
    />
  );
};

const PhoneItem = ({ user }) => {
  const { phone = {} } = user;
  const items = [{ type: 'tel', label: 'Phone', key: 'phone' }];
  return (
    <AccountItem
      title='Phone'
      field='phone'
      items={items}
      initial={phone}
      setContext={setPhone}
    />
  );
};
