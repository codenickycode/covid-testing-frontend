import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
  Name,
  Phone,
  Dob,
  useSetAllAccount,
} from '../../../Providers/AccountProvider.js';
import { App } from '../../../Providers/ContextProvider.js';
import { LoginSkeleton } from '../../Skeletons.js';
import { useTryCatchFinally } from '../../../tools/useTryCatchFinally.js';

const ConfirmUserInfo = ({ closeModal, setInfoIsConfirmed }) => {
  const name = useContext(Name);
  const phone = useContext(Phone);
  const dob = useContext(Dob);
  const { loading } = useContext(App);
  const setAllAccount = useSetAllAccount();
  const tryCatchFinally = useTryCatchFinally();

  const [userError, setUserError] = useState('');
  const [newFirstName, setNewFirstName] = useState(name.firstName || '');
  const [newLastName, setNewLastName] = useState(name.lastName || '');
  const [newPhone, setNewPhone] = useState(phone.phone || '');
  const [newDob, setNewDob] = useState(dob.dob || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newFirstName || !newLastName || !newPhone || !newDob) {
      setUserError('All fields are required.');
      return;
    }
    tryCatchFinally(tryFunc);
    async function tryFunc() {
      const res = await axios.post('/common/update/basic', {
        name: {
          firstName: newFirstName,
          lastName: newLastName,
        },
        phone: { phone: newPhone },
        dob: { dob: newDob },
      });
      setAllAccount({ ...res.data, headerName: res.data.name.firstName });
      setInfoIsConfirmed(true);
    }
  };

  return (
    <>
      <div className='overlay' onClick={closeModal}></div>
      <div className='modal'>
        {loading ? (
          <LoginSkeleton
            header='Booking...'
            message='Please wait while we book your appointment.'
          />
        ) : (
          <>
            <h1>Before confirming your appointment</h1>
            <p>We need a little info</p>
            {userError && <h2 className='error'>{userError}</h2>}
            <form id='form-reg-info' className='form' onSubmit={handleSubmit}>
              <p className='info-small'>*Required fields</p>
              <div>Name:</div>
              <label htmlFor='firstName' className='label-small'>
                <span className='info-small'>*</span>First
              </label>
              <input
                autoFocus
                type='text'
                name='firstName'
                value={newFirstName}
                onChange={(e) => setNewFirstName(e.target.value)}
              />
              <label htmlFor='lastName' className='label-small'>
                <span className='info-small'>*</span>Last
              </label>
              <input
                type='text'
                name='lastName'
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
              />
              <label htmlFor='phone' className='label-small'>
                <span className='info-small'>*</span>Phone
              </label>
              <input
                type='tel'
                name='phone'
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
              <label htmlFor='dob' className='label-small'>
                Date Of <span className='info-small'>*</span>Birth
              </label>
              <input
                type='date'
                name='dob'
                value={newDob}
                onChange={(e) => setNewDob(e.target.value)}
              />
              <button type='submit' className='btn'>
                Confirm
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default ConfirmUserInfo;
