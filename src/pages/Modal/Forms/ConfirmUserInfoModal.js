import React, { useState, useContext } from 'react';
import { User, SetUser } from '../../../Providers/User.js';

const ConfirmUserInfo = ({ closeModal }) => {
  const user = useContext(User);
  const setUser = useContext(SetUser);
  const [name, setName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [dob, setDob] = useState(user.dob || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user, name, phone, dob });
  };

  return (
    <>
      <div className='overlay' onClick={closeModal}></div>
      <div className='modal'>
        <h1>Before confirming your appointment</h1>
        <p>We need a little info</p>
        <form id='form-reg-info' className='form' onSubmit={handleSubmit}>
          <label htmlFor='name'>Full Name</label>
          <input
            autoFocus
            type='text'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
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
