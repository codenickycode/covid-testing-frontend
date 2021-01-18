import React, { useState, useEffect, useContext } from 'react';
import { getLS, setLS } from '../tools/tools.js';

export const INIT_ACCOUNT_STATE = {
  headerName: '',
  name: {},
  address: {},
  phone: {},
  dob: {},
  email: {},
  password: {},
  insurance: {},
  emergency_contact: {},
  travel: {},
  appointments: [],
};

export const HeaderName = React.createContext();
const SetHeaderName = React.createContext();
export const Name = React.createContext();
const SetName = React.createContext();
const NameProvider = ({ children }) => {
  const [headerName, setHeaderName] = useState(
    getLS('headerName' || INIT_ACCOUNT_STATE.headerName)
  );
  useEffect(() => {
    setLS('headerName', headerName);
  }, [headerName]);

  const [name, setName] = useState(getLS('name') || INIT_ACCOUNT_STATE.name);
  useEffect(() => {
    setLS('name', name);
  }, [name]);
  return (
    <SetHeaderName.Provider value={setHeaderName}>
      <HeaderName.Provider value={headerName}>
        <SetName.Provider value={setName}>
          <Name.Provider value={name}>{children}</Name.Provider>
        </SetName.Provider>
      </HeaderName.Provider>
    </SetHeaderName.Provider>
  );
};

export const Address = React.createContext();
const SetAddress = React.createContext();
const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState(
    getLS('address') || INIT_ACCOUNT_STATE.address
  );
  useEffect(() => {
    setLS('address', address);
  }, [address]);
  return (
    <SetAddress.Provider value={setAddress}>
      <Address.Provider value={address}>{children}</Address.Provider>
    </SetAddress.Provider>
  );
};

export const Phone = React.createContext();
const SetPhone = React.createContext();
const PhoneProvider = ({ children }) => {
  const [phone, setPhone] = useState(
    getLS('phone') || INIT_ACCOUNT_STATE.phone
  );
  useEffect(() => {
    setLS('phone', phone);
  }, [phone]);
  return (
    <SetPhone.Provider value={setPhone}>
      <Phone.Provider value={phone}>{children}</Phone.Provider>
    </SetPhone.Provider>
  );
};

export const Dob = React.createContext();
const SetDob = React.createContext();
const DobProvider = ({ children }) => {
  const [dob, setDob] = useState(getLS('dob') || INIT_ACCOUNT_STATE.dob);
  useEffect(() => {
    setLS('dob', dob);
  }, [dob]);
  return (
    <SetDob.Provider value={setDob}>
      <Dob.Provider value={dob}>{children}</Dob.Provider>
    </SetDob.Provider>
  );
};

export const Email = React.createContext();
const SetEmail = React.createContext();
const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState(
    getLS('email') || INIT_ACCOUNT_STATE.email
  );
  useEffect(() => {
    setLS('email', email);
  }, [email]);
  return (
    <SetEmail.Provider value={setEmail}>
      <Email.Provider value={email}>{children}</Email.Provider>
    </SetEmail.Provider>
  );
};

export const Password = React.createContext();
const SetPassword = React.createContext();
const PasswordProvider = ({ children }) => {
  const [password, setPassword] = useState(
    getLS('password') || INIT_ACCOUNT_STATE.password
  );
  useEffect(() => {
    setLS('password', password);
  }, [password]);
  return (
    <SetPassword.Provider value={setPassword}>
      <Password.Provider value={password}>{children}</Password.Provider>
    </SetPassword.Provider>
  );
};

export const Insurance = React.createContext();
const SetInsurance = React.createContext();
const InsuranceProvider = ({ children }) => {
  const [insurance, setInsurance] = useState(
    getLS('insurance') || INIT_ACCOUNT_STATE.insurance
  );
  useEffect(() => {
    setLS('insurance', insurance);
  }, [insurance]);
  return (
    <SetInsurance.Provider value={setInsurance}>
      <Insurance.Provider value={insurance}>{children}</Insurance.Provider>
    </SetInsurance.Provider>
  );
};

export const EmergencyContact = React.createContext();
const SetEmergencyContact = React.createContext();
const EmergencyContactProvider = ({ children }) => {
  const [emergency_contact, setEmergencyContact] = useState(
    getLS('emergency_contact') || INIT_ACCOUNT_STATE.emergency_contact
  );
  useEffect(() => {
    setLS('emergency_contact', emergency_contact);
  }, [emergency_contact]);
  return (
    <SetEmergencyContact.Provider value={setEmergencyContact}>
      <EmergencyContact.Provider value={emergency_contact}>
        {children}
      </EmergencyContact.Provider>
    </SetEmergencyContact.Provider>
  );
};

export const Travel = React.createContext();
const SetTravel = React.createContext();
const TravelProvider = ({ children }) => {
  const [travel, setTravel] = useState(
    getLS('travel') || INIT_ACCOUNT_STATE.travel
  );
  useEffect(() => {
    setLS('travel', travel);
  }, [travel]);
  return (
    <SetTravel.Provider value={setTravel}>
      <Travel.Provider value={travel}>{children}</Travel.Provider>
    </SetTravel.Provider>
  );
};

export const Appointments = React.createContext();
const SetAppointments = React.createContext();
const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(
    getLS('appointments') || INIT_ACCOUNT_STATE.appointments
  );
  useEffect(() => {
    setLS('appointments', appointments);
  }, [appointments]);
  return (
    <SetAppointments.Provider value={setAppointments}>
      <Appointments.Provider value={appointments}>
        {children}
      </Appointments.Provider>
    </SetAppointments.Provider>
  );
};

export const useSetAccount = () => {
  const setHeaderName = useContext(SetHeaderName);
  const setName = useContext(SetName);
  const setAddress = useContext(SetAddress);
  const setPhone = useContext(SetPhone);
  const setDob = useContext(SetDob);
  const setEmail = useContext(SetEmail);
  const setPassword = useContext(SetPassword);
  const setInsurance = useContext(SetInsurance);
  const setEmergencyContact = useContext(SetEmergencyContact);
  const setTravel = useContext(SetTravel);
  const setAppointments = useContext(SetAppointments);
  return {
    setHeaderName,
    setName,
    setAddress,
    setPhone,
    setDob,
    setEmail,
    setPassword,
    setInsurance,
    setEmergencyContact,
    setTravel,
    setAppointments,
  };
};

export const useSetAllAccount = () => {
  const all = useSetAccount();
  const setAllAccount = (value) => {
    all.setHeaderName(value.headerName);
    all.setName(value.name);
    all.setAddress(value.address);
    all.setPhone(value.phone);
    all.setDob(value.dob);
    all.setEmail(value.email);
    all.setPassword(value.password);
    all.setInsurance(value.insurance);
    all.setEmergencyContact(value.emergency_contact);
    all.setTravel(value.travel);
    all.setAppointments(value.appointments);
  };
  return setAllAccount;
};

const AccountProvider = ({ children }) => {
  return (
    <NameProvider>
      <AddressProvider>
        <PhoneProvider>
          <DobProvider>
            <EmailProvider>
              <PasswordProvider>
                <InsuranceProvider>
                  <EmergencyContactProvider>
                    <TravelProvider>
                      <AppointmentsProvider>{children}</AppointmentsProvider>
                    </TravelProvider>
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

export default AccountProvider;