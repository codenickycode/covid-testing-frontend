import React from 'react';
import dayjs from 'dayjs';
import { DATE_FORMAT } from './constants.js';

export const today = dayjs().format(DATE_FORMAT);

export const GetDate = React.createContext();
export const SetDate = React.createContext();
export const GetAllLocations = React.createContext();
export const SetAllLocations = React.createContext();
export const GetResults = React.createContext();
export const SetResults = React.createContext();
export const GetSelectedLocation = React.createContext();
export const SetSelectedLocation = React.createContext();

const ContextProvider = ({ children }) => {
  let date = today;
  const setDate = (input) => (date = input);

  let allLocations = [];
  const setAllLocations = (input) => (allLocations = [...input]);

  let results = [];
  const setResults = (input) => (results = [...input]);

  let selectedLocation = null;
  const setSelectedLocation = (input) => (selectedLocation = { ...input });

  return (
    <GetDate.Provider value={date}>
      <SetDate.Provider value={setDate}>
        <GetAllLocations.Provider value={allLocations}>
          <SetAllLocations.Provider value={setAllLocations}>
            <GetResults.Provider value={results}>
              <SetResults.Provider value={setResults}>
                <GetSelectedLocation.Provider value={selectedLocation}>
                  <SetSelectedLocation.Provider value={setSelectedLocation}>
                    {children}
                  </SetSelectedLocation.Provider>
                </GetSelectedLocation.Provider>
              </SetResults.Provider>
            </GetResults.Provider>
          </SetAllLocations.Provider>
        </GetAllLocations.Provider>
      </SetDate.Provider>
    </GetDate.Provider>
  );
};

export default ContextProvider;
