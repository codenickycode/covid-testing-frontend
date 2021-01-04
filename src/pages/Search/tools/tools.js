import dayjs from 'dayjs';
import { TIMESLOTS } from './constants.js';

export const addAvailableTimes = (locations, date) => {
  locations.forEach((location) => {
    location.available = [...TIMESLOTS];
    location.appointments.forEach((appointment) => {
      if (dayjs(appointment.date).isSame(dayjs(date), 'date')) {
        location.available.splice(
          location.available.indexOf(appointment.time),
          1
        );
      }
    });
  });
};

export const parseLocationsZips = (locations) => {
  let locationsZips = '';
  for (let location of locations) {
    locationsZips += location.address.zip + '|';
  }
  return locationsZips;
};

export const sortDistance = (unsorted) => {
  const locations = [...unsorted];
  const sortedLocations = locations.sort((a, b) => a.distance - b.distance);
  return sortedLocations;
};

export const sortTime = (unsorted) => {
  return unsorted.sort((a, b) => {
    let aDate = dayjs(`2000-01-01 ${a.available[0]}`);
    let bDate = dayjs(`2000-01-01 ${b.available[0]}`);
    return aDate.diff(bDate);
  });
};
