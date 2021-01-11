import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
  GetName,
  GetPhone,
  GetDob,
  useSetAllUserContext,
} from '../../../Providers/providers.js';

const ConfirmUserInfo = ({
  setLoading,
  closeModal,
  setConfirmedInfo,
  setError,
}) => {
  const name = useContext(GetName);
  const phone = useContext(GetPhone);
  const dob = useContext(GetDob);
  const setAllUserContext = useSetAllUserContext();

  const [newFirstName, setNewFirstName] = useState(name.firstName || '');
  const [newLastName, setNewLastName] = useState(name.lastName || '');
  const [newPhone, setNewPhone] = useState(phone.phone || '');
  const [newDob, setNewDob] = useState(dob.dob || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('/common/update/basic', {
        name: {
          firstName: newFirstName,
          lastName: newLastName,
        },
        phone: { phone: newPhone },
        dob: { dob: newDob },
      });
      setError('');
      for (let [key, val] of Object.entries(res.data)) {
        sessionStorage.setItem(key, JSON.stringify(val));
      }
      setAllUserContext(res.data);
      setConfirmedInfo(true);
    } catch (e) {
      const error = e.hasOwnProperty('response') ? e.response.data : e.message;
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='overlay' onClick={closeModal}></div>
      <div className='modal'>
        <h1>Before confirming your appointment</h1>
        <p>We need a little info</p>
        <form id='form-reg-info' className='form' onSubmit={handleSubmit}>
          <div>Name:</div>
          <label htmlFor='firstName'>First</label>
          <input
            autoFocus
            type='text'
            name='firstName'
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
          />
          <label htmlFor='lastName'>Last</label>
          <input
            type='text'
            name='lastName'
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
          />
          <label htmlFor='phone'>Phone</label>
          <input
            type='tel'
            name='phone'
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
          />
          <label htmlFor='dob'>Date Of Birth</label>
          <input
            type='date'
            name='dob'
            value={newDob}
            onChange={(e) => setNewDob(e.target.value)}
          />
          <button type='submit'>Confirm</button>
        </form>
      </div>
    </>
  );
};

export default ConfirmUserInfo;
