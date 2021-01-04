import { useContext } from 'react';
import axios from 'axios';
import { AllLocationsContext } from '../../../ContextProvider.js';
import { addAvailableTimes, parseLocationsZips } from './tools.js';
import { url } from '../../../url.js';

const useGetLocations = () => {
  let { allLocations, setAllLocations } = useContext(AllLocationsContext);

  const storeLocations = async (date) => {
    const res = await axios.get(url + 'locations');
    allLocations = res.data;
    addAvailableTimes(allLocations, date);
    setAllLocations(allLocations);
  };

  const storeDistances = async (zip) => {
    const locationsZips = parseLocationsZips(allLocations);
    const locationsPlusDistances = await axios.post(url + 'distances', {
      zip,
      locationsZips,
      locations: allLocations,
    });
    setAllLocations(locationsPlusDistances);
  };

  const filterLocationsBy = (type, filter) => {
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
