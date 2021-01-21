import { useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  App,
  SetApp,
  SetInfo,
  INIT_APP_STATE,
  INIT_INFO_STATE,
  Refresh,
  SetRefresh,
} from '../../Providers/Context';
import {
  useSetAllAccount,
  INIT_ACCOUNT_STATE,
  Preferences,
  SetPreferences,
} from '../../Providers/Account';
import { useTryCatchFinally } from '../../tools/useTryCatchFinally';

export default function useCustomHooks() {
  const history = useHistory();
  const tryCatchFinally = useTryCatchFinally();
  const { loggedIn } = useContext(App);
  const setApp = useContext(SetApp);
  const setInfo = useContext(SetInfo);
  const refresh = useContext(Refresh);
  const setRefresh = useContext(SetRefresh);
  const setAllAccount = useSetAllAccount();
  const preferences = useContext(Preferences);
  const { setPreferences, setUpdated } = useContext(SetPreferences);

  const logout = () => {
    history.push('/');
    tryCatchFinally(tryLogout, undefined, finallyFunc);
    async function tryLogout() {
      const res = await axios.get('/common/logout');
      console.log(res.data);
    }
    function finallyFunc() {
      setApp(INIT_APP_STATE);
      setInfo(INIT_INFO_STATE);
      setRefresh(true);
      setAllAccount(INIT_ACCOUNT_STATE);
      setPreferences({
        dark: false,
        remember: false,
      });
      localStorage.clear();
    }
  };

  return {
    loggedIn,
    refresh,
    preferences,
    logout,
    setPreferences,
    setUpdated,
  };
}
