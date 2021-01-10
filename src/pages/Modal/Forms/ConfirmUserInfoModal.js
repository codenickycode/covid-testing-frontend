import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
  GetName,
  SetName,
  GetPhone,
  SetPhone,
  GetDob,
  SetDob,
} from '../../../Providers/providers.js';

const ConfirmUserInfo = ({ setLoading, closeModal, setError }) => {
  const getName = useContext(GetName);
  const getPhone = useContext(GetPhone);
  const getDob = useContext(GetDob);
  const setNewName = useContext(SetName);
  const setNewPhone = useContext(SetPhone);
  const setNewDob = useContext(SetDob);

  const [firstName, setFirstName] = useState(getName.firstName || '');
  const [lastName, setLastName] = useState(getName.lastName || '');
  const [phone, setPhone] = useState(getPhone.phone || '');
  const [dob, setDob] = useState(getDob.dob || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('/common/update/basic', {
        name: {
          firstName,
          lastName,
        },
        phone: { phone },
        dob: { dob },
      });
      setError('');
      setNewName(res.data.name);
      setNewPhone(res.data.phone);
      setNewDob(res.data.dob);
    } catch (e) {
      const error = e.response.data || e.message;
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor='lastName'>Last</label>
          <input
            type='text'
            name='lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor='phone'>Phone</label>
          <input
            type='tel'
            name='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor='dob'>Date Of Birth</label>
          <input
            type='date'
            name='dob'
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <button type='submit'>Confirm</button>
        </form>
      </div>
    </>
  );
};

export default ConfirmUserInfo;
