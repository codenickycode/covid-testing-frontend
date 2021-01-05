import React, { useState } from 'react';

export const User = React.createContext();
export const SetUser = React.createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <User.Provider value={user}>
      <SetUser.Provider value={setUser}>{children}</SetUser.Provider>
    </User.Provider>
  );
};

export default UserProvider;
