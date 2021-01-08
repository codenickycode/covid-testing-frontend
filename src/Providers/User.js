import React, { useState } from 'react';

export const User = React.createContext();
export const SetUser = React.createContext();
export const LoggedIn = React.createContext();
export const SetLoggedIn = React.createContext();
export const UserField = React.createContext();
export const SetUserField = React.createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const userField = (field) => user[field];
  const setUserField = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  return (
    <User.Provider value={user}>
      <SetUser.Provider value={setUser}>
        <LoggedIn.Provider value={loggedIn}>
          <SetLoggedIn.Provider value={setLoggedIn}>
            <UserField.Provider value={userField}>
              <SetUserField.Provider value={setUserField}>
                {children}
              </SetUserField.Provider>
            </UserField.Provider>
          </SetLoggedIn.Provider>
        </LoggedIn.Provider>
      </SetUser.Provider>
    </User.Provider>
  );
};

export default UserProvider;
