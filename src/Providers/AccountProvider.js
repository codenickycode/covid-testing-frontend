import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { getLS } from '../tools/tools.js';
import { DARK_THEME, LIGHT_THEME } from '../constants.js';

const init_dark = getLS('dark');
const init_remember = getLS('remember');

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
  preferences: {
    dark: init_dark !== undefined ? init_dark : false,
    remember: init_remember !== undefined ? init_remember : false,
  },
};

export const Preferences = React.createContext();
export const SetPreferences = React.createContext();
const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(
    INIT_ACCOUNT_STATE.preferences
  );
  useEffect(() => {
    const style = document.querySelector(':root').style;
    style.cssText += ';' + (preferences.dark ? DARK_THEME : LIGHT_THEME);
  }, [preferences.dark]);

  const [timer, setTimer] = useState(0);
  let interval = useRef(null);

  function updated() {
    clearInterval(interval.current);
    setTimer(0);
    interval.current = setInterval(
      () => setTimer((prevTime) => prevTime + 1),
      1000
    );
  }

  useEffect(() => {
    if (timer > 1) {
      updateAccount();
      clearInterval(interval.current);
    }
    function updateAccount() {
      axios.post('/common/update/preferences', preferences);
    }
  }, [timer, preferences]);

  return (
    <SetPreferences.Provider value={{ setPreferences, updated }}>
      <Preferences.Provider value={preferences}>
        {children}
      </Preferences.Provider>
    </SetPreferences.Provider>
  );
};

export const HeaderName = React.createContext();
const SetHeaderName = React.createContext();
export const Name = React.createContext();
const SetName = React.createContext();
const NameProvider = ({ children }) => {
  const [headerName, setHeaderName] = useState(INIT_ACCOUNT_STATE.headerName);
  const [name, setName] = useState(INIT_ACCOUNT_STATE.name);
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
  const [address, setAddress] = useState(INIT_ACCOUNT_STATE.address);
  return (
    <SetAddress.Provider value={setAddress}>
      <Address.Provider value={address}>{children}</Address.Provider>
    </SetAddress.Provider>
  );
};

export const Phone = React.createContext();
const SetPhone = React.createContext();
const PhoneProvider = ({ children }) => {
  const [phone, setPhone] = useState(INIT_ACCOUNT_STATE.phone);
  return (
    <SetPhone.Provider value={setPhone}>
      <Phone.Provider value={phone}>{children}</Phone.Provider>
    </SetPhone.Provider>
  );
};

export const Dob = React.createContext();
const SetDob = React.createContext();
const DobProvider = ({ children }) => {
  const [dob, setDob] = useState(INIT_ACCOUNT_STATE.dob);
  return (
    <SetDob.Provider value={setDob}>
      <Dob.Provider value={dob}>{children}</Dob.Provider>
    </SetDob.Provider>
  );
};

export const Email = React.createContext();
const SetEmail = React.createContext();
const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState(INIT_ACCOUNT_STATE.email);
  return (
    <SetEmail.Provider value={setEmail}>
      <Email.Provider value={email}>{children}</Email.Provider>
    </SetEmail.Provider>
  );
};

export const Password = React.createContext();
const SetPassword = React.createContext();
const PasswordProvider = ({ children }) => {
  const [password, setPassword] = useState(INIT_ACCOUNT_STATE.password);
  return (
    <SetPassword.Provider value={setPassword}>
      <Password.Provider value={password}>{children}</Password.Provider>
    </SetPassword.Provider>
  );
};

export const Insurance = React.createContext();
const SetInsurance = React.createContext();
const InsuranceProvider = ({ children }) => {
  const [insurance, setInsurance] = useState(INIT_ACCOUNT_STATE.insurance);
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
    INIT_ACCOUNT_STATE.emergency_contact
  );
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
  const [travel, setTravel] = useState(INIT_ACCOUNT_STATE.travel);
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
    INIT_ACCOUNT_STATE.appointments
  );
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
  const { setPreferences } = useContext(SetPreferences);
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
    setPreferences,
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
    all.setPreferences(value.preferences);
  };
  return setAllAccount;
};

const AccountProvider = ({ children }) => {
  return (
    <PreferencesProvider>
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
    </PreferencesProvider>
  );
};

export default AccountProvider;
