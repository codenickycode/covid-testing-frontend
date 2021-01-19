import axios from 'axios';
import dayjs from 'dayjs';
import { DATE_FORMAT, TIMESLOTS } from '../constants.js';

export const getLS = (field) => JSON.parse(localStorage.getItem(field));
export const setLS = (field, value) =>
  localStorage.setItem(field, JSON.stringify(value));

export const getSS = (field) => JSON.parse(sessionStorage.getItem(field));
export const setSS = (field, value) =>
  sessionStorage.setItem(field, JSON.stringify(value));

export const TODAY = dayjs().format(DATE_FORMAT);

export const validPassword = (password) => {
  return password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/);
};

export const parseLocationsZips = (locations) => {
  let locationsZips = '';
  for (let location of locations) {
    locationsZips += location.address.zip + '|';
  }
  return locationsZips;
};

export const getLocations = async () => {
  const res = await axios.get('/common/locations');
  return res.data;
};

export const getDistances = async (zip, locations) => {
  const locationsZips = parseLocationsZips(locations);
  const res = await axios.post('/common/distances', {
    zip,
    locationsZips,
    locations,
  });
  return res.data;
};

export const filterLocationsBy = (type, filter, locations) => {
  if (!filter) return locations;
  if (type === 'tests') {
    const tests = filter;
    let filteredLocations = locations.filter((location) => {
      for (let [test] of Object.entries(tests)) {
        if (tests[test] && location.tests.indexOf(test) === -1) return false;
      }
      return true;
    });
    return filteredLocations;
  }
};

export const sortLocationsBy = (type, locations) => {
  sortLocationsByDistance(locations);
  if (type === 'time') sortLocationsByTime(locations);
};

const sortLocationsByDistance = (locations) => {
  locations.sort((a, b) => a.distance - b.distance);
};

const sortLocationsByTime = (locations) => {
  locations.sort((a, b) => {
    let aDate = dayjs(`2000-01-01 ${a.available[0]}`);
    let bDate = dayjs(`2000-01-01 ${b.available[0]}`);
    return aDate.diff(bDate);
  });
};

export const refreshAvailable = (locations, date) => {
  addAvailableTimes(locations, date);
};

export const addAvailableTimes = (locations, date = TODAY) => {
  function addAvailable(location, date) {
    location.available = [...TIMESLOTS];
    location.appointments.forEach((appointment) => {
      if (dayjs(appointment.date).isSame(dayjs(date), 'date')) {
        location.available.splice(
          location.available.indexOf(appointment.time),
          1
        );
      }
    });
  }
  if (!Array.isArray(locations)) {
    addAvailable(locations, date);
  } else {
    locations.forEach((location) => addAvailable(location, date));
  }
};

export const changeDate = (type, date) => {
  let newDate = dayjs(date);
  newDate = type === 'dec' ? newDate.subtract(1, 'day') : newDate.add(1, 'day');
  newDate = newDate.format(DATE_FORMAT);
  return newDate;
};

export const getSelection = (selected, locations) => {
  let selection = null;
  locations.forEach((location) => {
    if (location._id.toString() === selected) selection = location;
  });
  return selection;
};

// sort upcoming vs past
export const sortAppointments = (appointments) => {
  if (appointments.length === 0) return [[], []];
  let upcoming = [];
  let past = [];
  appointments.forEach((appointment) => {
    if (dayjs(appointment.date).isBefore(dayjs(TODAY))) {
      past.push(appointment);
    } else {
      upcoming.push(appointment);
    }
  });
  const upcomingSorted = sortAppointmentsByTime(upcoming);
  const pastSorted = sortAppointmentsByTime(past);
  return [upcomingSorted, pastSorted];
};

// sort by date then time
const sortAppointmentsByTime = (appointments) => {
  if (appointments.length === 0) return appointments;
  let dates = {};
  appointments.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
  appointments.forEach((appointment) => {
    if (!dates[appointment.date]) {
      dates[appointment.date] = [appointment];
    } else {
      dates[appointment.date].push(appointment);
    }
  });
  let sorted = [];
  for (let [, v] of Object.entries(dates)) {
    if (v.length === 1) {
      sorted.push(...v);
    } else {
      v.sort((a, b) => {
        let aDate = dayjs(`2000-01-01 ${a.time}`);
        let bDate = dayjs(`2000-01-01 ${b.time}`);
        return aDate.diff(bDate);
      });
      sorted.push(...v);
    }
  }
  return sorted;
};
