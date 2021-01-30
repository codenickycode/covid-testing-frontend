import React, { useState, useContext } from 'react';
import useFunctions from './useFunctions.js';
import { LoginSkeleton } from '../../../components/Skeletons.js';
import { App } from '../../../Providers/Context.js';
import tools from '../../../tools/index.js';
import Image from '../../../components/Image';
import { ReactComponent as LogoIcon } from '../../../icons/Logo.svg';
import { ReactComponent as ProfileIcon } from '../../../icons/Profile.svg';
import { ReactComponent as CalendarIcon } from '../../../icons/Calendar.svg';
import { ReactComponent as CallIcon } from '../../../icons/Call.svg';

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

  const handleInput = ({ target: { name, value } }) => {
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
          <div id='confirm-info' className='flex-col'>
            <div className='with-icon'>
              <LogoIcon />
              <h1>Before you confirm</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='item'>
                {errors.firstName ||
                  (errors.lastName && (
                    <h2 className='error'>
                      {errors.firstName || errors.lastName}
                    </h2>
                  ))}
                <div className='with-icon'>
                  <ProfileIcon />
                  <div className='confim-name'>
                    <label htmlFor='firstName'>First</label>
                    <input
                      className={errors.firstName ? 'invalid' : ''}
                      type='text'
                      name='firstName'
                      value={inputs.firstName}
                      onChange={handleInput}
                    />
                  </div>
                  <div className='confim-item'>
                    <label htmlFor='lastName'>Last</label>
                    <input
                      className={errors.lastName ? 'invalid' : ''}
                      type='text'
                      name='lastName'
                      value={inputs.lastName}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className='with-icon'>
                  <CalendarIcon />
                  <div className='confirm-item'>
                    <label htmlFor='dob'>Date of Birth</label>
                    <input
                      className={errors.dob ? 'invalid dob' : 'dob'}
                      type='date'
                      name='dob'
                      value={inputs.dob}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className='with-icon'>
                  <CallIcon />
                  <div className='confirm-item'>
                    <label htmlFor='phone'>Phone</label>
                    <input
                      className={errors.phone ? 'invalid' : ''}
                      type='tel'
                      name='phone'
                      value={inputs.phone}
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </div>

              {window.innerHeight > 650 && (
                <Image
                  src='/img/png/confirm.png'
                  alt='Confirm illustration'
                  size='med'
                />
              )}

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
