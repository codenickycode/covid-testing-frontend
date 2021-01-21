import React, { useState } from 'react';
import axios from 'axios';
import useCustomHooks from './customHooks.js';
import UserInfoField from './UserInfoField.js';
import { LoginSkeleton } from '../../../components/Skeletons.js';

const ConfirmUserInfo = ({ closeModal, setInfoIsConfirmed }) => {
  const use = useCustomHooks();
  const [inputs, setInputs] = useState(use.USER_BASIC.inputs);
  const [errors, setErrors] = useState(use.USER_BASIC.errors);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'phone' && value && value[value.length - 1].match(/\D/))
      return;
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let tempErrors = {};
    let interupt = false;
    for (let [name, val] of Object.entries(inputs)) {
      if (!val) {
        tempErrors[name] = 'required';
        document.querySelector(`input[name=${name}]`).focus();
        interupt = true;
      } else {
        tempErrors[name] = '';
      }
    }
    setErrors(tempErrors);
    if (interupt) return;

    const { firstName, lastName, phone, dob } = inputs;
    use.tryCatchFinally(updateBasic);
    async function updateBasic() {
      const res = await axios.post('/common/update/basic', {
        name: { firstName, lastName },
        phone: { phone },
        dob: { dob },
      });
      use.setAllAccount({ ...res.data, headerName: res.data.name.firstName });
      setInfoIsConfirmed(true);
      use.setApp((prev) => ({
        ...prev,
        confirmation: 'Appointment confirmed!',
      }));
    }
  };

  return (
    <>
      <div className='overlay' onClick={closeModal}></div>
      <div className='modal'>
        {use.loading ? (
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
              {Object.keys(use.USER_BASIC.inputs).map((field) => (
                <UserInfoField
                  key={field}
                  field={field}
                  label={use.USER_BASIC.labels[field]}
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
