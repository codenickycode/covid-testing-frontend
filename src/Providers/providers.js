import React, { useState, useContext } from 'react';

export const GetLoggedIn = React.createContext();
const SetLoggedIn = React.createContext();
const LoggedInProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <SetLoggedIn.Provider value={setLoggedIn}>
      <GetLoggedIn.Provider value={loggedIn}>{children}</GetLoggedIn.Provider>
    </SetLoggedIn.Provider>
  );
};

export const UpdateAccountHeader = React.createContext();
const SetUpdateAccountHeader = React.createContext();
const UpdateAccountHeaderProvider = ({ children }) => {
  const [update, setUpdate] = useState(true);

  return (
    <SetUpdateAccountHeader.Provider value={setUpdate}>
      <UpdateAccountHeader.Provider value={update}>
        {children}
      </UpdateAccountHeader.Provider>
    </SetUpdateAccountHeader.Provider>
  );
};

export const GetName = React.createContext();
const SetName = React.createContext();
const NameProvider = ({ children }) => {
  const [name, setName] = useState('');
  console.log(name);
  return (
    <SetName.Provider value={setName}>
      <GetName.Provider value={name}>{children}</GetName.Provider>
    </SetName.Provider>
  );
};

export const GetAddress = React.createContext();
const SetAddress = React.createContext();
const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState({});
  return (
    <SetAddress.Provider value={setAddress}>
      <GetAddress.Provider value={address}>{children}</GetAddress.Provider>
    </SetAddress.Provider>
  );
};

export const GetPhone = React.createContext();
const SetPhone = React.createContext();
const PhoneProvider = ({ children }) => {
  const [phone, setPhone] = useState({});
  return (
    <SetPhone.Provider value={setPhone}>
      <GetPhone.Provider value={phone}>{children}</GetPhone.Provider>
    </SetPhone.Provider>
  );
};

export const GetDob = React.createContext();
const SetDob = React.createContext();
const DobProvider = ({ children }) => {
  const [dob, setDob] = useState({});
  return (
    <SetDob.Provider value={setDob}>
      <GetDob.Provider value={dob}>{children}</GetDob.Provider>
    </SetDob.Provider>
  );
};

export const GetEmail = React.createContext();
const SetEmail = React.createContext();
const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState({});
  return (
    <SetEmail.Provider value={setEmail}>
      <GetEmail.Provider value={email}>{children}</GetEmail.Provider>
    </SetEmail.Provider>
  );
};

export const GetPassword = React.createContext();
const SetPassword = React.createContext();
const PasswordProvider = ({ children }) => {
  const [password, setPassword] = useState({});
  return (
    <SetPassword.Provider value={setPassword}>
      <GetPassword.Provider value={password}>{children}</GetPassword.Provider>
    </SetPassword.Provider>
  );
};

export const GetInsurance = React.createContext();
const SetInsurance = React.createContext();
const InsuranceProvider = ({ children }) => {
  const [insurance, setInsurance] = useState({});
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
  const [emergency_contact, setEmergencyContact] = useState({});
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
  const [travel, setTravel] = useState([]);
  return (
    <SetTravel.Provider value={setTravel}>
      <GetTravel.Provider value={travel}>{children}</GetTravel.Provider>
    </SetTravel.Provider>
  );
};

export const ContextProvider = ({ children }) => {
  return (
    <LoggedInProvider>
      <UpdateAccountHeaderProvider>
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
      </UpdateAccountHeaderProvider>
    </LoggedInProvider>
  );
};

export const useSetContext = () => {
  const setLoggedIn = useContext(SetLoggedIn);
  const setUpdateAccountHeader = useContext(SetUpdateAccountHeader);
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
    setLoggedIn,
    setUpdateAccountHeader,
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

export const useSetAllUserContext = () => {
  const setName = useContext(SetName);
  const setAddress = useContext(SetAddress);
  const setPhone = useContext(SetPhone);
  const setDob = useContext(SetDob);
  const setEmail = useContext(SetEmail);
  const setPassword = useContext(SetPassword);
  const setInsurance = useContext(SetInsurance);
  const setEmergencyContact = useContext(SetEmergencyContact);
  const setTravel = useContext(SetTravel);

  const setAllUserContext = (value) => {
    setName(value.name);
    setAddress(value.address);
    setPhone(value.phone);
    setDob(value.dob);
    setEmail(value.email);
    setPassword(value.password);
    setInsurance(value.insurance);
    setEmergencyContact(value.emergency_contact);
    setTravel(value.travel);
  };
  return setAllUserContext;
};
