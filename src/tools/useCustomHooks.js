import { useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { App, Refresh, SetApp, SetRefresh } from '../Providers/Context';
import { useSetAllAccount, useSetAccount } from '../Providers/Account';
import { SetPreferences } from '../Providers/Preferences';

export default function useCustomHooks() {
  const history = useHistory();
  const setApp = useContext(SetApp);
  const { setAppointments } = useSetAccount();
  const setRefresh = useContext(SetRefresh);
  const setAllAccount = useSetAllAccount();
  const { setPreferences } = useContext(SetPreferences);
  const { loggedIn } = useContext(App);
  const refresh = useContext(Refresh);

  const redirect = !loggedIn || refresh;

  async function tryCatchFinally(t, c, f) {
    let error = '';
    try {
      setApp((prev) => ({ ...prev, loading: true }));
      await t();
    } catch (e) {
      console.log(e);
      error = e.hasOwnProperty('response') ? e.response.data : e.message;
      if (e.status === 401)
        setApp((prev) => ({ ...prev, loggedIn: false, error }));
      if (c) c(error);
    } finally {
      setApp((prev) => ({ ...prev, loading: false }));
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

  const bookAppointment = (appointment) => {
    history.push('/appointments');
    tryCatchFinally(book, catchFunc);
    async function book() {
      const res = await axios.post('/common/appointments', appointment);
      setAppointments(res.data.appointments);
      setApp((prev) => ({ ...prev, confirmation: res.data.confirmation }));
    }
    function catchFunc(error) {
      setApp((prev) => ({ ...prev, error }));
    }
  };
  return { redirect, getClient, tryCatchFinally, bookAppointment };
}
