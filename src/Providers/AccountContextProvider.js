import React, { useState, useEffect, useContext } from 'react';
import { getLS, setLS } from '../pages/Search/tools/tools.js';

export const INIT_ACCOUNT_CONTEXT = {
  name: {},
  address: {},
  phone: {},
  dob: {},
  email: {},
  password: {},
  insurance: {},
  emergency_contact: {},
  travel: {},
};

export const GetName = React.createContext();
const SetName = React.createContext();
const NameProvider = ({ children }) => {
  const [name, setName] = useState(getLS('name') || {});
  useEffect(() => {
    setLS('name', name);
  }, [name]);
  return (
    <SetName.Provider value={setName}>
      <GetName.Provider value={name}>{children}</GetName.Provider>
    </SetName.Provider>
  );
};

export const GetAddress = React.createContext();
const SetAddress = React.createContext();
const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState(getLS('address') || {});
  useEffect(() => {
    setLS('address', address);
  }, [address]);
  return (
    <SetAddress.Provider value={setAddress}>
      <GetAddress.Provider value={address}>{children}</GetAddress.Provider>
    </SetAddress.Provider>
  );
};

export const GetPhone = React.createContext();
const SetPhone = React.createContext();
const PhoneProvider = ({ children }) => {
  const [phone, setPhone] = useState(getLS('phone') || {});
  useEffect(() => {
    setLS('phone', phone);
  }, [phone]);
  return (
    <SetPhone.Provider value={setPhone}>
      <GetPhone.Provider value={phone}>{children}</GetPhone.Provider>
    </SetPhone.Provider>
  );
};

export const GetDob = React.createContext();
const SetDob = React.createContext();
const DobProvider = ({ children }) => {
  const [dob, setDob] = useState(getLS('dob') || {});
  useEffect(() => {
    setLS('dob', dob);
  }, [dob]);
  return (
    <SetDob.Provider value={setDob}>
      <GetDob.Provider value={dob}>{children}</GetDob.Provider>
    </SetDob.Provider>
  );
};

export const GetEmail = React.createContext();
const SetEmail = React.createContext();
const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState(getLS('email') || {});
  useEffect(() => {
    setLS('email', email);
  }, [email]);
  return (
    <SetEmail.Provider value={setEmail}>
      <GetEmail.Provider value={email}>{children}</GetEmail.Provider>
    </SetEmail.Provider>
  );
};

export const GetPassword = React.createContext();
const SetPassword = React.createContext();
const PasswordProvider = ({ children }) => {
  const [password, setPassword] = useState(getLS('password') || {});
  useEffect(() => {
    setLS('password', password);
  }, [password]);
  return (
    <SetPassword.Provider value={setPassword}>
      <GetPassword.Provider value={password}>{children}</GetPassword.Provider>
    </SetPassword.Provider>
  );
};

export const GetInsurance = React.createContext();
const SetInsurance = React.createContext();
const InsuranceProvider = ({ children }) => {
  const [insurance, setInsurance] = useState(getLS('insurance') || {});
  useEffect(() => {
    setLS('insurance', insurance);
  }, [insurance]);
  return (
    <SetInsurance.Provider value={setInsurance}>
      <GetInsurance.Provider value={insurance}>
        {children}
      </GetInsurance.Provider>
    </SetInsurance.Provider>
  );
};

export const GetEmergencyContact = React.createContext();
const SetEmergencyContact = React.createContext();
const EmergencyContactProvider = ({ children }) => {
  const [emergency_contact, setEmergencyContact] = useState(
    getLS('emergency_contact') || {}
  );
  useEffect(() => {
    setLS('emergency_contact', emergency_contact);
  }, [emergency_contact]);
  return (
    <SetEmergencyContact.Provider value={setEmergencyContact}>
      <GetEmergencyContact.Provider value={emergency_contact}>
        {children}
      </GetEmergencyContact.Provider>
    </SetEmergencyContact.Provider>
  );
};

export const GetTravel = React.createContext();
const SetTravel = React.createContext();
const TravelProvider = ({ children }) => {
  const [travel, setTravel] = useState(getLS('travel') || {});
  useEffect(() => {
    setLS('travel', travel);
  }, [travel]);
  return (
    <SetTravel.Provider value={setTravel}>
      <GetTravel.Provider value={travel}>{children}</GetTravel.Provider>
    </SetTravel.Provider>
  );
};

export const useSetAccountContext = () => {
  const setName = useContext(SetName);
  const setAddress = useContext(SetAddress);
  const setPhone = useContext(SetPhone);
  const setDob = useContext(SetDob);
  const setEmail = useContext(SetEmail);
  const setPassword = useContext(SetPassword);
  const setInsurance = useContext(SetInsurance);
  const setEmergencyContact = useContext(SetEmergencyContact);
  const setTravel = useContext(SetTravel);
  return {
    setName,
    setAddress,
    setPhone,
    setDob,
    setEmail,
    setPassword,
    setInsurance,
    setEmergencyContact,
    setTravel,
  };
};

export const useSetAllAccountContext = () => {
  const all = useSetAccountContext();
  const setAllAccountContext = (value) => {
    all.setName(value.name);
    all.setAddress(value.address);
    all.setPhone(value.phone);
    all.setDob(value.dob);
    all.setEmail(value.email);
    all.setPassword(value.password);
    all.setInsurance(value.insurance);
    all.setEmergencyContact(value.emergency_contact);
    all.setTravel(value.travel);
  };
  return setAllAccountContext;
};

const AccountContextProvider = ({ children }) => {
  return (
    <NameProvider>
      <AddressProvider>
        <PhoneProvider>
          <DobProvider>
            <EmailProvider>
              <PasswordProvider>
                <InsuranceProvider>
                  <EmergencyContactProvider>
                    <TravelProvider>{children}</TravelProvider>
                  </EmergencyContactProvider>
                </InsuranceProvider>
              </PasswordProvider>
            </EmailProvider>
          </DobProvider>
        </PhoneProvider>
      </AddressProvider>
    </NameProvider>
  );
};

export default AccountContextProvider;
