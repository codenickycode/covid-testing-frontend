import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import {
  Name,
  Phone,
  Dob,
  useSetAllAccount,
} from '../../../Providers/AccountProvider.js';
import { App, SetApp } from '../../../Providers/ContextProvider.js';
import { LoginSkeleton } from '../../Skeletons.js';
import { useTryCatchFinally } from '../../../tools/useTryCatchFinally.js';
import UserInfoField from './UserInfoField.js';

const ConfirmUserInfo = ({ closeModal, setInfoIsConfirmed }) => {
  const name = useContext(Name);
  const phone = useContext(Phone);
  const dob = useContext(Dob);
  const { loading } = useContext(App);
  const setApp = useContext(SetApp);
  const setAllAccount = useSetAllAccount();
  const tryCatchFinally = useTryCatchFinally();

  const INIT_FIELDS = {
    inputs: {
      newFirst: name.firstName || '',
      newLast: name.lastName || '',
      newPhone: phone.phone || '',
      newDob: dob.dob || '',
    },
    labels: {
      newFirst: 'First',
      newLast: 'Last',
      newPhone: 'Phone',
      newDob: 'Date of Birth',
    },
  };
  Object.keys(INIT_FIELDS.inputs).forEach((field) => (INIT_FIELDS.errors = ''));
  const [inputs, setInputs] = useState(INIT_FIELDS.inputs);
  const [errors, setErrors] = useState(INIT_FIELDS.errors);

  const handleInput = (e, field) => {
    const val = e.target.value;
    if (field === 'newPhone' && val && val[val.length - 1].match(/\D/)) return;
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setInputs((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = INIT_FIELDS;
    let interupt = false;
    for (let [key, val] of Object.entries(inputs)) {
      if (!val) {
        tempErrors[key] = 'required';
        interupt = true;
      } else {
        tempErrors[key] = '';
      }
    }
    setErrors(tempErrors);
    if (interupt) return;
    const { newFirst, newLast, newPhone, newDob } = inputs;
    tryCatchFinally(tryFunc);
    async function tryFunc() {
      const res = await axios.post('/common/update/basic', {
        name: {
          firstName: newFirst,
          lastName: newLast,
        },
        phone: { phone: newPhone },
        dob: { dob: newDob },
      });
      setAllAccount({ ...res.data, headerName: res.data.name.firstName });
      setInfoIsConfirmed(true);
      setApp((prev) => ({ ...prev, confirmation: 'Appointment confirmed!' }));
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
            <form id='form-reg-info' className='form' onSubmit={handleSubmit}>
              <p className='info-small'>*Required fields</p>
              <div>Name:</div>
              {Object.keys(INIT_FIELDS.inputs).map((field) => (
                <UserInfoField
                  key={field}
                  field={field}
                  label={INIT_FIELDS.labels[field]}
                  input={inputs[field]}
                  error={errors[field]}
                  handleInput={handleInput}
                />
              ))}

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
