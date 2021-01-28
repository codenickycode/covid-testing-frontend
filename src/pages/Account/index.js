import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { App } from '../../Providers/Context';
import AccountHeader from './Header';
import AccountItem from './Item.js';
import { ReactComponent as NameIcon } from '../../icons/Profile.svg';
import { ReactComponent as PhoneIcon } from '../../icons/Call.svg';
import { ReactComponent as EmailIcon } from '../../icons/Message.svg';
import { ReactComponent as DobIcon } from '../../icons/Calendar.svg';
import { ReactComponent as AddressIcon } from '../../icons/Location.svg';
import { ReactComponent as FriendIcon } from '../../icons/2User.svg';
import { ReactComponent as PasswordIcon } from '../../icons/Password.svg';
import { ReactComponent as DocumentIcon } from '../../icons/Document.svg';

export default function Account() {
  const { user } = useContext(App);
  return !user ? (
    <Redirect to='/gateway/account' />
  ) : (
    <div id='account'>
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
  const icon = () => <NameIcon className='icon-fill' />;
  return <AccountItem title='Name' field='name' items={items} icon={icon} />;
};

const AddressItem = () => {
  const items = [
    { type: 'text', label: 'Street', key: 'street' },
    { type: 'text', label: 'City', key: 'city' },
    { type: 'text', label: 'State', key: 'state' },
    { type: 'text', label: 'Zip', key: 'zip' },
  ];
  const icon = () => <AddressIcon />;
  return (
    <AccountItem title='Address' field='address' items={items} icon={icon} />
  );
};

const DobItem = () => {
  const items = [{ type: 'date', label: 'Date of Birth', key: 'dob' }];
  const icon = () => <DobIcon />;
  return (
    <AccountItem title='Date of Birth' field='dob' items={items} icon={icon} />
  );
};

const EmailItem = () => {
  const items = [{ type: 'email', label: 'Email', key: 'email' }];
  const icon = () => <EmailIcon className='icon-fill' />;
  return <AccountItem title='Email' field='email' items={items} icon={icon} />;
};

const EmergencyContactItem = () => {
  const items = [
    { type: 'text', label: 'Name', key: 'name' },
    { type: 'tel', label: 'Phone', key: 'phone' },
    { type: 'text', label: 'Relation', key: 'relation' },
  ];
  const icon = () => <FriendIcon className='icon-fill' />;
  return (
    <AccountItem
      title='Emergency Contact'
      field='emergency_contact'
      items={items}
      icon={icon}
    />
  );
};

const InsuranceItem = () => {
  const items = [
    { type: 'text', label: 'Provider', key: 'provider' },
    { type: 'text', label: 'ID', key: 'id' },
  ];
  const icon = () => <DocumentIcon />;
  return (
    <AccountItem
      title='Insurance'
      field='insurance'
      items={items}
      icon={icon}
    />
  );
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
  const icon = () => <PasswordIcon className='icon-fill' />;
  return (
    <AccountItem title='Password' field='password' items={items} icon={icon} />
  );
};

const PhoneItem = () => {
  const items = [{ type: 'tel', label: 'Phone', key: 'phone' }];
  const icon = () => <PhoneIcon className='icon-fill' />;
  return <AccountItem title='Phone' field='phone' items={items} icon={icon} />;
};
