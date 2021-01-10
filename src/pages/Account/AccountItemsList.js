import React from 'react';
import Name from './Fields/Name.js';
import Address from './Fields/Address.js';
import Phone from './Fields/Phone.js';
import Dob from './Fields/Dob.js';
import Email from './Fields/Email.js';
import Password from './Fields/Password.js';
import Insurance from './Fields/Insurance.js';
import EmergencyContact from './Fields/EmergencyContact.js';
// import Travel from './Fields/Travel.js';

const AccountItemsList = () => {
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
};

export default AccountItemsList;
