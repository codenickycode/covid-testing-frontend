import { AccountItem } from './Item.js';
import * as icons from '../../icons';

export const AccountItemsList = () => {
  return (
    <div id='account-items-list'>
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
};

const NameItem = () => {
  const items = [
    { type: 'text', label: 'First', key: 'firstName' },
    { type: 'text', label: 'Last', key: 'lastName' },
  ];
  return (
    <AccountItem
      title='Name'
      field='name'
      items={items}
      icon={icons.profileIcon}
    />
  );
};

const AddressItem = () => {
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
      icon={icons.locationIcon}
    />
  );
};

const DobItem = () => {
  const items = [{ type: 'date', label: 'Date of Birth', key: 'dob' }];
  return (
    <AccountItem
      title='Date of Birth'
      field='dob'
      items={items}
      icon={icons.calendarIcon}
    />
  );
};

const EmailItem = () => {
  const items = [{ type: 'email', label: 'Email', key: 'email' }];
  return (
    <AccountItem
      title='Email'
      field='email'
      items={items}
      icon={icons.messageIcon}
    />
  );
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
      icon={icons.friendIcon}
    />
  );
};

const InsuranceItem = () => {
  const items = [
    { type: 'text', label: 'Provider', key: 'provider' },
    { type: 'text', label: 'ID', key: 'id' },
  ];
  return (
    <AccountItem
      title='Insurance'
      field='insurance'
      items={items}
      icon={icons.documentIcon}
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
  return (
    <AccountItem
      title='Password'
      field='password'
      items={items}
      icon={icons.passwordIcon}
    />
  );
};

const PhoneItem = () => {
  const items = [{ type: 'tel', label: 'Phone', key: 'phone' }];
  return (
    <AccountItem
      title='Phone'
      field='phone'
      items={items}
      icon={icons.callIcon}
    />
  );
};
