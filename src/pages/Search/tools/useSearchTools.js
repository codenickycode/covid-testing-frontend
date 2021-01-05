import { useContext } from 'react';
import dayjs from 'dayjs';
import {
  GetAllLocations,
  GetResults,
  SetResults,
  GetDate,
  SetDate,
} from '../../../ContextProvider';
import useGetLocations from './useGetLocations.js';
import { DATE_FORMAT, TIMESLOTS } from '../../../constants.js';

const useSearchTools = () => {
  const { storeLocations, storeDistances, storeSelection } = useGetLocations();
  const allLocations = useContext(GetAllLocations);
  const results = useContext(GetResults);
  const setResults = useContext(SetResults);
  const date = useContext(GetDate);
  const setDate = useContext(SetDate);

  const filterLocationsBy = (type, filter) => {
    if (!filter) return setResults(allLocations);
    if (type === 'tests') {
      const tests = filter;
      const filteredLocations = allLocations.filter((location) => {
        for (let [test] of Object.entries(tests)) {
          if (tests[test] && location.tests.indexOf(test) === -1) return false;
        }
        return true;
      });
      setResults(filteredLocations);
      addAvailableTimes();
    }
  };

  const sortDistance = () => {
    const locations = [...results];
    const sortedLocations = locations.sort((a, b) => a.distance - b.distance);
    setResults(sortedLocations);
  };

  const sortTime = () => {
    const unsorted = [...results];
    const sorted = unsorted.sort((a, b) => {
      let aDate = dayjs(`2000-01-01 ${a.available[0]}`);
      let bDate = dayjs(`2000-01-01 ${b.available[0]}`);
      return aDate.diff(bDate);
    });
    setResults(sorted);
  };

  const changeDate = (type) => {
    let newDate = dayjs(date);
    newDate =
      type === 'dec' ? newDate.subtract(1, 'day') : newDate.add(1, 'day');
    newDate = newDate.format(DATE_FORMAT);
    setDate(newDate);
    addAvailableTimes();
  };

  const addAvailableTimes = () => {
    let newLocations = [...results];
    newLocations.forEach((location) => {
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
    setResults(newLocations);
  };

  return {
    filterLocationsBy,
    sortDistance,
    sortTime,
    changeDate,
    storeLocations,
    storeDistances,
    storeSelection,
  };
};

export default useSearchTools;
