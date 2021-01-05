import axios from 'axios';
import dayjs from 'dayjs';
import { URL, DATE_FORMAT, TIMESLOTS } from '../../../constants.js';

export const today = dayjs().format(DATE_FORMAT);

export const getLocations = async () => {
  const res = await axios.get(URL + 'locations');
  return res.data;
};

export const getDistances = async (zip, locations) => {
  const locationsZips = parseLocationsZips(locations);
  const res = await axios.post(URL + 'distances', {
    zip,
    locationsZips,
    locations,
  });
  return res.data;
};

const parseLocationsZips = (locations) => {
  let locationsZips = '';
  for (let location of locations) {
    locationsZips += location.address.zip + '|';
  }
  return locationsZips;
};

export const getSelection = (selected, locations) => {
  let selection = null;
  locations.forEach((location) => {
    if (location._id.toString() === selected) selection = location;
  });
  return selection;
};

export const filterLocationsBy = (type, filter, allLocations) => {
  if (!filter) return allLocations;
  if (type === 'tests') {
    const tests = filter;
    let filteredLocations = allLocations.filter((location) => {
      for (let [test] of Object.entries(tests)) {
        if (tests[test] && location.tests.indexOf(test) === -1) return false;
      }
      return true;
    });
    addAvailableTimes(filteredLocations);
    return filteredLocations;
  }
};

export const sortByDistance = (locations) => {
  locations.sort((a, b) => a.distance - b.distance);
};

export const sortByTime = (locations) => {
  locations.sort((a, b) => {
    let aDate = dayjs(`2000-01-01 ${a.available[0]}`);
    let bDate = dayjs(`2000-01-01 ${b.available[0]}`);
    return aDate.diff(bDate);
  });
};

export const changeDate = (type, date) => {
  let newDate = dayjs(date);
  newDate = type === 'dec' ? newDate.subtract(1, 'day') : newDate.add(1, 'day');
  newDate = newDate.format(DATE_FORMAT);
  return newDate;
};

export const addAvailableTimes = (locations, date = today) => {
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