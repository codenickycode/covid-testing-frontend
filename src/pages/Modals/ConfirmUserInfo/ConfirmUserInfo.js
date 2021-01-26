import React, { useState, useContext } from 'react';
import useFunctions from './useFunctions.js';
import UserInfoField from './UserInfoField.js';
import { LoginSkeleton } from '../../../components/Skeletons.js';
import { App } from '../../../Providers/Context.js';
import tools from '../../../tools/index.js';
import Image from '../../../components/Image';

const ConfirmUserInfo = ({ closeModal, setInfoIsConfirmed }) => {
  const { loading, user } = useContext(App);
  const { checkValid, updateAccountBasic } = useFunctions();

  const [inputs, setInputs] = useState({
    firstName: user?.name?.firstName || '',
    lastName: user?.name?.lastName || '',
    phone: user?.phone?.phone || '',
    dob: user?.dob?.dob || '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dob: '',
  });
  const labels = {
    firstName: 'First',
    lastName: 'Last',
    phone: 'Phone',
    dob: 'Date of Birth',
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'phone' && !tools.validNum(value)) return;
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
          <div id='confirm-info'>
            <h1>
              <span className='logo'></span>Before confirming your appointment
            </h1>
            <p>We need a little info</p>
            <form onSubmit={handleSubmit}>
              <div>Name:</div>
              <div id='confirm-grid'>
                {Object.keys(inputs).map((field) => (
                  <UserInfoField
                    key={field}
                    field={field}
                    label={labels[field]}
                    input={inputs[field]}
                    error={errors[field]}
                    handleInput={handleInput}
                  />
                ))}
              </div>
              <Image
                src='/img/png/confirm.png'
                alt='Confirm illustration'
                size='med'
              />

              <button type='submit' className='btn'>
                Confirm
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ConfirmUserInfo;
