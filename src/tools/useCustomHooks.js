import { useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  SetApp,
  SetInfo,
  INIT_APP,
  INIT_INFO,
  SetRefresh,
} from '../Providers/Context';
import {
  useSetAllAccount,
  useSetAccount,
  INIT_ACCOUNT,
} from '../Providers/Account';
import { INIT_PREFERENCES, SetPreferences } from '../Providers/Preferences';

export default function useCustomHooks() {
  const history = useHistory();
  const setApp = useContext(SetApp);
  const setInfo = useContext(SetInfo);
  const { setAppointments } = useSetAccount();
  const setRefresh = useContext(SetRefresh);
  const setAllAccount = useSetAllAccount();
  const { setPreferences } = useContext(SetPreferences);

  async function tryCatchFinally(t, c, f) {
    let error = '';
    try {
      setApp((prevState) => ({
        ...prevState,
        loading: true,
      }));
      await t();
    } catch (e) {
      console.log(e);
      error = e.hasOwnProperty('response') ? e.response.data : e.message;
      if (e.status === 401)
        setApp((prevState) => ({ ...prevState, loggedIn: false, error }));
      if (c) c(error);
    } finally {
      setApp((prevState) => ({
        ...prevState,
        loading: false,
      }));
      if (f) f();
    }
  }

  async function getClient() {
    tryCatchFinally(tryGetClient);
    async function tryGetClient() {
      const res = await axios.get('/common/user');
      const preferences = { ...res.data.preferences };
      delete res.data.preferences;
      setAllAccount({ ...res.data, headerName: res.data.name.firstName });
      setPreferences(preferences);
      setRefresh(false);
      setApp((prev) => ({ ...prev, loggedIn: true }));
    }
  }

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

  const bookAppointment = (appointment) => {
    history.push('/appointments');
    tryCatchFinally(book, catchFunc);
    async function book() {
      const res = await axios.post('/common/appointments', appointment);
      setAppointments(res.data.appointments);
      setApp((prevState) => ({
        ...prevState,
        confirmation: res.data.confirmation,
      }));
    }
    function catchFunc(error) {
      setApp((prevState) => ({ ...prevState, error }));
    }
  };
  return { getClient, logout, tryCatchFinally, bookAppointment };
}
