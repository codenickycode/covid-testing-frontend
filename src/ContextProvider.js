import React, { useState } from 'react';

export const AppContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [title, setTitle] = useState('COVID-19 Tests');
  const [fetching, setFetching] = useState(false);

  return (
    <AppContext.Provider value={{ title, setTitle, fetching, setFetching }}>
      {children}
    </AppContext.Provider>
  );
};
