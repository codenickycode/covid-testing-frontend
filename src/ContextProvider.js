import React, { useState } from 'react';

export const AppContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [title, setTitle] = useState('COVID-19 Tests');
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AppContext.Provider value={{ title, setTitle, loggedIn, setLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};
