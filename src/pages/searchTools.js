import dayjs from 'dayjs';
import { TIMESLOTS } from '../constants.js';

export const getAvailableTimes = (locations, date) => {
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

export const sortDistance = (unsorted) => {
  let locations = [...unsorted];
  return locations.sort((a, b) => a.distance - b.distance);
};

export const filterLocations = (tests, locations) => {
  return locations.filter((location) => {
    location.tests.forEach((test, i) => {
      location.tests[i] = test.toLowerCase();
    });
    for (let [test] of Object.entries(tests)) {
      if (tests[test] && location.tests.indexOf(test) === -1) return false;
    }
    return true;
  });
};
