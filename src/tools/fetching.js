import axios from 'axios';
import { api, options } from '../api';

export const parseLocationsZips = (locations) => {
  let locationsZips = '';
  for (let location of locations) {
    locationsZips += location.address.zip + '|';
  }
  return locationsZips;
};

export const getLocations = async () => {
  const res = await axios.get(`${api}/locations`, options);
  return res.data;
};

export const getDistances = async (zip, locations) => {
  const locationsZips = parseLocationsZips(locations);
  const res = await axios.post(
    `${api}/distances`,
    {
      zip,
      locationsZips,
      locations,
    },
    options
  );
  return res.data;
};
