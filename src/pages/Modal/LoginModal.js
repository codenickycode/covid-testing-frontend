import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import LoginForm from './Forms/LoginForm.js';
import {
  SetLoggedIn,
  SetName,
  SetAddress,
  SetPhone,
  SetDob,
  SetEmail,
  SetInsurance,
  SetEmergencyContact,
  SetTravel,
  NameProvider,
  AddressProvider,
  PhoneProvider,
  DobProvider,
  EmailProvider,
  InsuranceProvider,
  EmergencyContactProvider,
  TravelProvider,
} from '../../Providers/providers.js';

const LoginEntry = ({ closeModal }) => {
  return (
    <NameProvider>
      <AddressProvider>
        <PhoneProvider>
          <DobProvider>
            <EmailProvider>
              <InsuranceProvider>
                <EmergencyContactProvider>
                  <TravelProvider>
                    <Login closeModal={closeModal} />
                  </TravelProvider>
                </EmergencyContactProvider>
              </InsuranceProvider>
            </EmailProvider>
          </DobProvider>
        </PhoneProvider>
      </AddressProvider>
    </NameProvider>
  );
};

const Login = ({ closeModal }) => {
  const setLoggedIn = useContext(SetLoggedIn);
  const setName = useContext(SetName);
  const setAddress = useContext(SetAddress);
  const setPhone = useContext(SetPhone);
  const setDob = useContext(SetDob);
  const setEmail = useContext(SetEmail);
  const setInsurance = useContext(SetInsurance);
  const setEmergencyContact = useContext(SetEmergencyContact);
  const setTravel = useContext(SetTravel);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (type, email, password) => {
    try {
      setLoading(true);
      const res = await axios.post(`/common/${type}`, {
        email,
        password,
      });
      setName(res.data.name);
      setAddress(res.data.address);
      setPhone(res.data.phone);
      setDob(res.data.dob);
      setEmail(res.data.email);
      setInsurance(res.data.insurance);
      setEmergencyContact(res.data.emergency_contact);
      setTravel(res.data.travel);
      setLoggedIn(true);
    } catch (e) {
      const error = e.response ? e.response.data : e.message;
      setError(error);
      setLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className='overlay' onClick={closeModal}></div>
      <div className='modal'>
        {loading ? (
          <h1>loading...</h1>
        ) : (
          <>
            {error && <h2>{error}</h2>}
            <LoginForm submit={submit} setError={setError} />
          </>
        )}
      </div>
    </>,
    document.getElementById('portal')
  );
};
export default LoginEntry;
