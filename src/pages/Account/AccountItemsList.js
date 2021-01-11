import React, { useContext } from 'react';
import {
  GetName,
  GetAddress,
  GetPhone,
  GetDob,
  GetEmail,
  GetPassword,
  GetInsurance,
  GetEmergencyContact,
  useSetContext,
} from '../../Providers/providers.js';
import AccountItem from './AccountItem.js';

export default function AccountItemsList() {
  return (
    <div id='account-items'>
      <Name />
      <Address />
      <Phone />
      <Dob />
      <Email />
      <Password />
      <Insurance />
      <EmergencyContact />
      {/* <Travel /> */}
    </div>
  );
}

const Name = () => {
  const name = useContext(GetName);
  const { setName, setUpdateAccountHeader } = useSetContext();
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
      setUpdate={setUpdateAccountHeader}
    />
  );
};

const Address = () => {
  const address = useContext(GetAddress);
  const { setAddress } = useSetContext();
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

const Dob = () => {
  const dob = useContext(GetDob);
  const { setDob } = useSetContext();
  const items = [{ type: 'date', label: 'Date of Birth', key: 'dob' }];
  return (
    <AccountItem
      title='Dob'
      field='dob'
      items={items}
      input={dob}
      setContext={setDob}
    />
  );
};

const Email = () => {
  const email = useContext(GetEmail);
  const { setEmail } = useSetContext();
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

const EmergencyContact = () => {
  const emergency_contact = useContext(GetEmergencyContact);
  const { setEmergencyContact } = useSetContext();
  const items = [
    { type: 'text', label: 'Name', key: 'name' },
    { type: 'tel', label: 'Phone', key: 'phone' },
    { type: 'text', label: 'Relation', key: 'relation' },
  ];
  return (
    <AccountItem
      title='EmergencyContact'
      field='emergency_contact'
      items={items}
      input={emergency_contact}
      setContext={setEmergencyContact}
    />
  );
};

const Insurance = () => {
  const insurance = useContext(GetInsurance);
  const { setInsurance } = useSetContext();
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

const Password = () => {
  const password = useContext(GetPassword);
  const { setPassword } = useSetContext();
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

const Phone = () => {
  const phone = useContext(GetPhone);
  const { setPhone } = useSetContext();
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

// const Travel = () => {
//   const { travel } = useGetContext();
//   const { setTravel } = useSetContext();
//   const items = [];
//   return (
//     <AccountItem
//       title='Travel'
//       field='travel'
//       items={items}
//       input={travel}
//       setContext={setTravel}
//     />
//   );
// };
