import { useContext } from 'react';
import axios from 'axios';
import {
  GetAllLocations,
  SetAllLocations,
  GetResults,
  SetSelectedLocation,
} from '../../../ContextProvider.js';
import { URL } from '../../../constants.js';

const useGetLocations = () => {
  const allLocations = useContext(GetAllLocations);
  const setAllLocations = useContext(SetAllLocations);
  const results = useContext(GetResults);
  const setSelectedLocation = useContext(SetSelectedLocation);

  const storeLocations = async () => {
    const res = await axios.get(URL + 'locations');
    const locations = res.data;
    setAllLocations(locations);
    console.log('after set all: ', locations);
  };

  const storeDistances = async (zip) => {
    console.log('start of storeDistnace: ', allLocations);
    const locationsZips = parseLocationsZips(allLocations);
    const locationsPlusDistances = await axios.post(URL + 'distances', {
      zip,
      locationsZips,
      locations: allLocations,
    });
    setAllLocations(locationsPlusDistances.data);
  };

  const storeSelection = (selected) => {
    results.forEach((location) => {
      if (location._id.toString() === selected) setSelectedLocation(location);
    });
  };
  return { storeLocations, storeDistances, storeSelection };
};

const parseLocationsZips = (locations) => {
  let locationsZips = '';
  for (let location of locations) {
    locationsZips += location.address.zip + '|';
  }
  return locationsZips;
};

export default useGetLocations;
