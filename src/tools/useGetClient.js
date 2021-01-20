import { useContext } from 'react';
import axios from 'axios';
import { SetApp, SetRefresh } from '../Providers/ContextProvider.js';
import { useSetAllAccount } from '../Providers/AccountProvider.js';
import { useTryCatchFinally } from './useTryCatchFinally.js';

export const useGetClient = () => {
  const tryCatchFinally = useTryCatchFinally();
  const setApp = useContext(SetApp);
  const setRefresh = useContext(SetRefresh);
  const setAllAccount = useSetAllAccount();

  function getClient() {
    tryCatchFinally(tryFunc);
    async function tryFunc() {
      const res = await axios.get('/common/user');
      setAllAccount({ ...res.data, headerName: res.data.name.firstName });
      setApp((prevState) => ({ ...prevState, loggedIn: true }));
      setRefresh(false);
    }
  }

  return getClient;
};
