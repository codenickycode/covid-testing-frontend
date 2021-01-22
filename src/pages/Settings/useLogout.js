import { useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  SetApp,
  SetInfo,
  INIT_APP,
  INIT_INFO,
  SetRefresh,
} from '../../Providers/Context';
import { useSetAllAccount, INIT_ACCOUNT } from '../../Providers/Account';
import { INIT_PREFERENCES, SetPreferences } from '../../Providers/Preferences';
import useCustomHooks from '../../tools/useCustomHooks';

export default function useLogout() {
  const history = useHistory();
  const setApp = useContext(SetApp);
  const setInfo = useContext(SetInfo);
  const setRefresh = useContext(SetRefresh);
  const setAllAccount = useSetAllAccount();
  const { setPreferences } = useContext(SetPreferences);
  const { tryCatchFinally } = useCustomHooks();

  function logout() {
    history.push('/');
    tryCatchFinally(tryLogout, catchFunc, finallyFunc);
    async function tryLogout() {
      const res = await axios.get('/common/logout');
      setApp({ ...INIT_APP, confirmation: res.data });
    }
    function catchFunc(error) {
      setApp({ ...INIT_APP, error });
    }
    function finallyFunc() {
      setRefresh(true);
      setInfo(INIT_INFO);
      setAllAccount(INIT_ACCOUNT);
      setPreferences(INIT_PREFERENCES);
      localStorage.clear();
    }
  }

  return logout;
}
