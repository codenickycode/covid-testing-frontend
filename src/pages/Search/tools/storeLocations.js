import axios from 'axios';
import { addAvailableTimes } from './tools.js';
import * as keys from '../../../storageKeys.js';

const parseLocationsZips = (locations) => {
  let locationsZips = '';
  for (let location of locations) {
    locationsZips += location.address.zip + '|';
  }
  return locationsZips;
};

export const storeLocations = async (date) => {
  try {
    const res = await axios.get(`http://localhost:8000/common/locations`);
    const allLocations = res.data;
    addAvailableTimes(allLocations, date);
    sessionStorage.setItem(keys.ALL_LOCATIONS, JSON.stringify(allLocations));
  } catch (e) {
    throw e;
  }
};

// add distance from zip to each location
export const storeDistances = async (zip) => {
  try {
    const locations = JSON.parse(sessionStorage.getItem(keys.ALL_LOCATIONS));
    const locationsZips = parseLocationsZips(locations);
    const locationsPlusDistances = await axios.post(
      `http://localhost:8000/common/distances`,
      {
        zip,
        locationsZips,
        locations,
      }
    );
    sessionStorage.setItem(
      keys.ALL_LOCATIONS,
      JSON.stringify(locationsPlusDistances.data)
    );
  } catch (e) {
    throw e;
  }
};
