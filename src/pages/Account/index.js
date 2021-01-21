import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Name,
  Address,
  Phone,
  Dob,
  Email,
  Password,
  Insurance,
  EmergencyContact,
  useSetAccount,
} from '../../Providers/Account.js';
import { App, Refresh } from '../../Providers/Context.js';
import AccountHeader from './Header';
import AccountItem from './Item.js';

export default function Account() {
  const refresh = useContext(Refresh);
  const { loggedIn } = useContext(App);

  return !loggedIn || refresh ? (
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
  const name = useContext(Name);
  const { setName, setHeaderName } = useSetAccount();
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
      setContext={setName}
      setHeader={setHeaderName}
    />
  );
};

const AddressItem = () => {
  const address = useContext(Address);
  const { setAddress } = useSetAccount();
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
      input={address}
      setContext={setAddress}
    />
  );
};

const DobItem = () => {
  const dob = useContext(Dob);
  const { setDob } = useSetAccount();
  const items = [{ type: 'date', label: 'Date of Birth', key: 'dob' }];
  return (
    <AccountItem
      title='Date of Birth'
      field='dob'
      items={items}
      input={dob}
      setContext={setDob}
    />
  );
};

const EmailItem = () => {
  const email = useContext(Email);
  const { setEmail } = useSetAccount();
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

const EmergencyContactItem = () => {
  const emergency_contact = useContext(EmergencyContact);
  const { setEmergencyContact } = useSetAccount();
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
      input={emergency_contact}
      setContext={setEmergencyContact}
    />
  );
};

const InsuranceItem = () => {
  const insurance = useContext(Insurance);
  const { setInsurance } = useSetAccount();
  const items = [
    { type: 'text', label: 'Provider', key: 'provider' },
    { type: 'text', label: 'ID', key: 'id' },
  ];
  return (
    <AccountItem
      title='Insurance'
      field='insurance'
      items={items}
      input={insurance}
      setContext={setInsurance}
    />
  );
};

const PasswordItem = () => {
  const password = useContext(Password);
  const { setPassword } = useSetAccount();
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

const PhoneItem = () => {
  const phone = useContext(Phone);
  const { setPhone } = useSetAccount();
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
