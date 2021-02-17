import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

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

export const sortLocationsByDistance = (locations) => {
  locations.sort((a, b) => a.distance - b.distance);
};

export const sortLocationsByTime = (locations) => {
  locations.sort((a, b) => {
    if (b.available.length === 0) return -1;
    return dayjs(a.available[0], 'hh:mm A') - dayjs(b.available[0], 'hh:mm A');
  });
};

export const getSelection = (selected, locations) => {
  let selection = null;
  locations.forEach((location) => {
    if (location._id.toString() === selected) selection = location;
  });
  return selection;
};
