import { useContext } from 'react';
import axios from 'axios';
import { GetContext, SetContext } from '../../../ContextProvider.js';
import * as keys from '../../../contextKeys.js';
import { addAvailableTimes, parseLocationsZips } from './tools.js';
import { url } from '../../../url.js';

const useGetLocations = () => {
  const getContext = useContext(GetContext);
  const setContext = useContext(SetContext);

  const storeLocations = async (date) => {
    const res = await axios.get(url + 'locations');
    let allLocations = res.data;
    addAvailableTimes(allLocations, date);
    setContext(keys.ALL_LOCATIONS, allLocations);
  };

  const storeDistances = async (zip) => {
    const allLocations = getContext(keys.ALL_LOCATIONS);
    const locationsZips = parseLocationsZips(allLocations);
    const locationsPlusDistances = await axios.post(url + 'distances', {
      zip,
      locationsZips,
      locations: allLocations,
    });
    setContext(keys.ALL_LOCATIONS, locationsPlusDistances.data);
  };

  const filterLocationsBy = (type, filter) => {
    const allLocations = getContext(keys.ALL_LOCATIONS);
    if (type === 'tests') {
      const tests = filter;
      const filteredLocations = allLocations.filter((location) => {
        for (let [test] of Object.entries(tests)) {
          if (tests[test] && location.tests.indexOf(test) === -1) return false;
        }
        return true;
      });
      return filteredLocations;
    }
  };

  return { storeLocations, storeDistances, filterLocationsBy };
};

export default useGetLocations;
