import { useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  SetApp,
  SetInfo,
  INIT_APP_STATE,
  INIT_INFO_STATE,
  SetRefresh,
} from '../../Providers/Context';
import { useSetAllAccount, INIT_ACCOUNT_STATE } from '../../Providers/Account';
import { SetPreferences } from '../../Providers/Preferences';
import { useTryCatchFinally } from '../../tools/useTryCatchFinally';

export const useLogout = () => {
  const history = useHistory();
  const tryCatchFinally = useTryCatchFinally();
  const setApp = useContext(SetApp);
  const setInfo = useContext(SetInfo);
  const setRefresh = useContext(SetRefresh);
  const setAllAccount = useSetAllAccount();
  const { setPreferences } = useContext(SetPreferences);

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

  return logout;
};
