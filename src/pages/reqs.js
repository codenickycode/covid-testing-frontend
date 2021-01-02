import axios from 'axios';
import { getAvailableTimes } from './searchTools.js';

const parseLocationsZips = (locations) => {
  let locationsZips = '';
  for (let location of locations) {
    locationsZips += location.address.zip + '|';
  }
  return locationsZips;
};

export const getLocations = async (date) => {
  try {
    const res = await axios.get(`http://localhost:8000/common/locations`);
    const allLocations = res.data;
    getAvailableTimes(allLocations, date);
    return allLocations;
  } catch (e) {
    throw e;
  }
};

// add distance from zip to each location
export const getDistances = async (zip, locations) => {
  try {
    const locationsZips = parseLocationsZips(locations);
    const locationsPlusDistances = await axios.post(
      `http://localhost:8000/common/distances`,
      {
        zip,
        locationsZips,
        locations,
      }
    );
    console.log(locationsPlusDistances);
    return locationsPlusDistances.data;
  } catch (e) {
    throw e;
  }
};
