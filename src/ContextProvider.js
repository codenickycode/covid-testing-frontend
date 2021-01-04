import React from 'react';
import dayjs from 'dayjs';

export const AllLocationsContext = React.createContext();
export const DateContext = React.createContext();
export const SelectedLocationContext = React.createContext();
export const AppointmentContext = React.createContext();
export const UserContext = React.createContext();

const ContextProvider = ({ children }) => {
  let allLocations = null;
  const setAllLocations = (input) => (allLocations = input);
  let selectedLocation = null;
  const setSelectedLocation = (input) => (selectedLocation = input);
  const format = 'MMMM D, YYYY';
  const today = dayjs().format(format);
  let date = today;
  const setDate = (input) => (date = input);
  let newAppointment = null;
  const setNewAppointment = (input) => (newAppointment = input);
  let confirmation = null;
  const setConfirmation = (input) => (confirmation = input);
  let user = null;
  const setUser = (input) => (user = input);

  return (
    <AllLocationsContext.Provider value={{ allLocations, setAllLocations }}>
      <DateContext.Provider value={{ format, today, date, setDate }}>
        <SelectedLocationContext.Provider
          value={{ selectedLocation, setSelectedLocation }}
        >
          <AppointmentContext.Provider
            value={{
              newAppointment,
              setNewAppointment,
              confirmation,
              setConfirmation,
            }}
          >
            <UserContext.Provider value={{ user, setUser }}>
              {children}
            </UserContext.Provider>
          </AppointmentContext.Provider>
        </SelectedLocationContext.Provider>
      </DateContext.Provider>
    </AllLocationsContext.Provider>
  );
};

export default ContextProvider;
