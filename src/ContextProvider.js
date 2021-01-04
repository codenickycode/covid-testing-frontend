import React from 'react';
import dayjs from 'dayjs';
import * as keys from './contextKeys.js';

const format = 'MMMM D, YYYY';
const today = dayjs().format(format);

export const GetContext = React.createContext();
export const SetContext = React.createContext();

const ContextProvider = ({ children }) => {
  const context = {
    [keys.ALL_LOCATIONS]: null,
    [keys.SELECTED_LOCATION]: null,
    [keys.DATE]: today,
    [keys.NEW_APPOINTMENT]: null,
    [keys.CONFIRMATION]: null,
    [keys.USER]: null,
  };
  const getContext = (key) => context[key];
  const setContext = (key, value) => (context[key] = value);

  return (
    <GetContext.Provider value={getContext}>
      <SetContext.Provider value={setContext}>{children}</SetContext.Provider>
    </GetContext.Provider>
  );
};

export default ContextProvider;
