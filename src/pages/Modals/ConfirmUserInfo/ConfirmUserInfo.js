import React, { useState, useContext } from 'react';
import useFunctions from './useFunctions.js';
import UserInfoField from './UserInfoField.js';
import { LoginSkeleton } from '../../../components/Skeletons.js';
import { App } from '../../../Providers/Context.js';

const ConfirmUserInfo = ({ closeModal, setInfoIsConfirmed }) => {
  const { loading } = useContext(App);
  const { USER_BASIC, checkValid, updateAccountBasic } = useFunctions();

  const [inputs, setInputs] = useState(USER_BASIC.inputs);
  const [errors, setErrors] = useState(USER_BASIC.errors);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'phone' && value && value[value.length - 1].match(/\D/))
      return;
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const [newErrors, interupt] = checkValid(inputs);
    setErrors(newErrors);
    if (interupt) return;
    updateAccountBasic(inputs, () => setInfoIsConfirmed(true));
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
              {Object.keys(USER_BASIC.inputs).map((field) => (
                <UserInfoField
                  key={field}
                  field={field}
                  label={USER_BASIC.labels[field]}
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
