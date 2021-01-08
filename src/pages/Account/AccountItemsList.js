import React from 'react';
import AccountItem from './AccountItem.js';

const AccountItemsList = ({ user, updates, setUpdates }) => {
  return (
    <div id='account-items'>
      <AccountItem
        field='Name'
        inputs={[user.firstName, user.lastName]}
        updates={updates}
        setUpdates={setUpdates}
      />
      <AccountItem
        field='Address'
        inputs={[
          user.address.street,
          user.address.city,
          user.address.state,
          user.address.zip,
        ]}
        updates={updates}
        setUpdates={setUpdates}
      />
      <AccountItem
        field='Phone'
        inputs={[user.phone]}
        updates={updates}
        setUpdates={setUpdates}
      />
      <AccountItem
        field='Date of Birth'
        inputs={[user.dob]}
        updates={updates}
        setUpdates={setUpdates}
      />
      <AccountItem
        field='Email'
        inputs={[user.email]}
        updates={updates}
        setUpdates={setUpdates}
      />
      <AccountItem
        field='Password'
        inputs={[user.password]}
        updates={updates}
        setUpdates={setUpdates}
      />
      <AccountItem
        field='Health Insurance'
        inputs={[user.ins_provider, user.ins_id]}
        updates={updates}
        setUpdates={setUpdates}
      />
      <AccountItem
        field='Emergency Contact'
        inputs={[
          user.emergency_contact.name,
          user.emergency_contact.phone,
          user.emergency_contact.relation,
        ]}
        updates={updates}
        setUpdates={setUpdates}
      />
      <AccountItem
        field='Travel'
        inputs={[user.travel]}
        updates={updates}
        setUpdates={setUpdates}
      />
    </div>
  );
};

export default AccountItemsList;
