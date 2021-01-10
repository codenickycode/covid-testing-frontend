import React, { useState, useContext } from 'react';

export const GetLoggedIn = React.createContext();
export const SetLoggedIn = React.createContext();
export const LoggedInProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <SetLoggedIn.Provider value={setLoggedIn}>
      <GetLoggedIn.Provider value={loggedIn}>{children}</GetLoggedIn.Provider>
    </SetLoggedIn.Provider>
  );
};

export const GetName = React.createContext();
export const SetName = React.createContext();
export const NameProvider = ({ children }) => {
  const [name, setName] = useState({});
  return (
    <SetName.Provider value={setName}>
      <GetName.Provider value={name}>{children}</GetName.Provider>
    </SetName.Provider>
  );
};

export const GetAddress = React.createContext();
export const SetAddress = React.createContext();
export const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState({});
  return (
    <SetAddress.Provider value={setAddress}>
      <GetAddress.Provider value={address}>{children}</GetAddress.Provider>
    </SetAddress.Provider>
  );
};

export const GetPhone = React.createContext();
export const SetPhone = React.createContext();
export const PhoneProvider = ({ children }) => {
  const [phone, setPhone] = useState({});
  return (
    <SetPhone.Provider value={setPhone}>
      <GetPhone.Provider value={phone}>{children}</GetPhone.Provider>
    </SetPhone.Provider>
  );
};

export const GetDob = React.createContext();
export const SetDob = React.createContext();
export const DobProvider = ({ children }) => {
  const [dob, setDob] = useState({});
  return (
    <SetDob.Provider value={setDob}>
      <GetDob.Provider value={dob}>{children}</GetDob.Provider>
    </SetDob.Provider>
  );
};

export const GetEmail = React.createContext();
export const SetEmail = React.createContext();
export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState({});
  return (
    <SetEmail.Provider value={setEmail}>
      <GetEmail.Provider value={email}>{children}</GetEmail.Provider>
    </SetEmail.Provider>
  );
};

export const GetInsurance = React.createContext();
export const SetInsurance = React.createContext();
export const InsuranceProvider = ({ children }) => {
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
export const SetEmergencyContact = React.createContext();
export const EmergencyContactProvider = ({ children }) => {
  const [emergencyContact, setEmergencyContact] = useState({});
  return (
    <SetEmergencyContact.Provider value={setEmergencyContact}>
      <GetEmergencyContact.Provider value={emergencyContact}>
        {children}
      </GetEmergencyContact.Provider>
    </SetEmergencyContact.Provider>
  );
};

export const GetTravel = React.createContext();
export const SetTravel = React.createContext();
export const TravelProvider = ({ children }) => {
  const [travel, setTravel] = useState([]);
  return (
    <SetTravel.Provider value={setTravel}>
      <GetTravel.Provider value={travel}>{children}</GetTravel.Provider>
    </SetTravel.Provider>
  );
};

const SetAllUserProvider = ({ children }) => {
  return (
    <NameProvider>
      <AddressProvider>
        <PhoneProvider>
          <DobProvider>
            <EmailProvider>
              <InsuranceProvider>
                <EmergencyContactProvider>
                  <TravelProvider>{children}</TravelProvider>
                </EmergencyContactProvider>
              </InsuranceProvider>
            </EmailProvider>
          </DobProvider>
        </PhoneProvider>
      </AddressProvider>
    </NameProvider>
  );
};

const SetAllUser = ({ input }) => {
  const setName = useContext(SetName);
  const setAddress = useContext(SetAddress);
  const setPhone = useContext(SetPhone);
  const setDob = useContext(SetDob);
  const setEmail = useContext(SetEmail);
  const setInsurance = useContext(SetInsurance);
  const setEmergencyContact = useContext(SetEmergencyContact);
  const setTravel = useContext(SetTravel);

  console.log(input);

  setName(input.name);
  setAddress(input.address);
  setPhone(input.phone);
  setDob(input.dob);
  setEmail(input.email);
  setInsurance(input.insurance);
  setEmergencyContact(input.emergency_contact);
  setTravel(input.travel);
};

export const setAllUser = (input) => {
  return (
    <SetAllUserProvider>
      <SetAllUser input={input} />
    </SetAllUserProvider>
  );
};
