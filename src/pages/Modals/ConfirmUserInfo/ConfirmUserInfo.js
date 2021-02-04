import React, { useState, useContext } from 'react';
import useFunctions from './useFunctions.js';
import { LoginSkeleton } from '../../../components/Skeletons.js';
import { App } from '../../../Providers/Context.js';
import tools from '../../../tools/index.js';
import Image from '../../../components/Image';
import * as icons from '../../../icons';
import { Input, Submit, WithIcon } from '../../../components/index.js';

const ConfirmUserInfo = ({ setInfoIsConfirmed }) => {
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

  return loading ? (
    <LoginSkeleton
      header='Booking...'
      message='Please wait while we book your appointment.'
    />
  ) : (
    <div id='confirm-info' className='flex-col'>
      <WithIcon icon={icons.logo}>
        <h1>Before you confirm</h1>
      </WithIcon>
      <form onSubmit={handleSubmit}>
        <WithIcon icon={icons.profile}>
          <Input
            field='firstName'
            error={errors.firstName}
            value={inputs.firstName}
            onChange={handleInput}
          />
          <Input
            field='lastName'
            error={errors.lastName}
            value={inputs.lastName}
            onChange={handleInput}
          />
        </WithIcon>
        <WithIcon icon={icons.calendar}>
          <Input
            field='dob'
            error={errors.dob}
            value={inputs.dob}
            onChange={handleInput}
          />
        </WithIcon>
        <WithIcon icon={icons.phone}>
          <Input
            field='phone'
            error={errors.phone}
            value={inputs.phone}
            onChange={handleInput}
          />
        </WithIcon>
        {window.innerHeight > 650 && (
          <Image
            src='/img/png/confirm.png'
            alt='Confirm illustration'
            size='med'
          />
        )}
        <Submit label='Confirm' />
      </form>
    </div>
  );
};

export default ConfirmUserInfo;
