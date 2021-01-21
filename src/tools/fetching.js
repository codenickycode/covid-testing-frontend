import { useContext } from 'react';
import axios from 'axios';
import { SetApp, SetRefresh } from '../Providers/Context.js';
import { useSetAllAccount } from '../Providers/Account.js';
import { useTryCatchFinally } from './useTryCatchFinally.js';

export const useGetClient = () => {
  const tryCatchFinally = useTryCatchFinally();
  const setApp = useContext(SetApp);
  const setRefresh = useContext(SetRefresh);
  const setAllAccount = useSetAllAccount();

  function getClient() {
    tryCatchFinally(tryGetClient);
    async function tryGetClient() {
      const res = await axios.get('/common/user');
      setAllAccount({ ...res.data, headerName: res.data.name.firstName });
      setApp((prevState) => ({ ...prevState, loggedIn: true }));
      setRefresh(false);
    }
  }

  return getClient;
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
