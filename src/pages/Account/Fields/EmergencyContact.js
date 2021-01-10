import React, { useContext } from 'react';
import {
  GetEmergencyContact,
  SetEmergencyContact,
} from '../../../Providers/providers.js';
import AccountItem from '../AccountItem.js';

const EmergencyContact = () => {
  const emergency_contact = useContext(GetEmergencyContact);
  const setEmergencyContact = useContext(SetEmergencyContact);

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

export default EmergencyContact;
