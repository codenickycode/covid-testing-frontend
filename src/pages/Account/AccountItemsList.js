import React from 'react';
import {
  NameProvider,
  // AddressProvider,
  // PhoneProvider,
  // DobProvider,
  // EmailProvider,
  // InsuranceProvider,
  // EmergencyContactProvider,
} from '../../Providers/providers.js';
import Name from './Fields/Name.js';
// import Address from './Fields/Address.js';
// import Phone from './Fields/Phone.js';
// import Dob from './Fields/Dob.js';
// import Email from './Fields/Email.js';
// import Insurance from './Fields/Insurance.js';
// import EmergencyContact from './Fields/EmergencyContact.js';

const AccountItemsList = () => {
  return (
    <div id='account-items'>
      <NameProvider>
        <Name />
      </NameProvider>
      {/* <AddressProvider>
        <Address title='Address' field='address' items={address} />
      </AddressProvider>
      <PhoneProvider>
        <Phone title='Phone' field='phone' items={phone} />
      </PhoneProvider>
      <DobProvider>
        <Dob title='Date of Birth' field='dob' items={dob} />
      </DobProvider>
      <EmailProvider>
        <Email title='Email' field='email' items={email} />
      </EmailProvider>
      <Password title='Password' field='password' items={password} />
      <InsuranceProvider>
        <Insurance title='Insurance' field='insurance' items={insurance} />
      </InsuranceProvider>
      <EmergencyContactProvider>
        <EmergencyContact
          title='Emergency Contact'
          field='emergency_contact'
          items={emergency_contact}
        />
      </EmergencyContactProvider> */}
    </div>
  );
};

export default AccountItemsList;

// const address = [
//     { type: 'text', label: 'Street', key: 'street' },
//     { type: 'text', label: 'City', key: 'city' },
//     { type: 'text', label: 'State', key: 'state' },
//     { type: 'text', label: 'Zip', key: 'zip' },
//   ];
//   const phone = [{ type: 'tel', label: 'Phone', key: 'phone' }];
//   const dob = [{ type: 'date', label: 'Date of Birth', key: 'dob' }];
//   const email = [{ type: 'email', label: 'Email', key: 'email' }];
//   const password = [
//     { type: 'password', label: 'Current Password', key: 'currentPassword' },
//     { type: 'password', label: 'New Password', key: 'newPassword' },
//   ];
//   const insurance = [
//     { type: 'text', label: 'Provider', key: 'provider' },
//     { type: 'text', label: 'ID', key: 'id' },
//   ];
//   const emergency_contact = [
//     { type: 'text', label: 'Name', key: 'name' },
//     { type: 'tel', label: 'Phone', key: 'phone' },
//     { type: 'text', label: 'Relation', key: 'relation' },
//   ];
