import { useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSetAccount } from '../../../Providers/Account.js';
import { App, Info, SetApp } from '../../../Providers/Context.js';
import { useTryCatchFinally } from '../../../tools/useTryCatchFinally.js';

export default function useCustomHooks() {
  const history = useHistory();
  const { loggedIn } = useContext(App);
  const { appointment } = useContext(Info);
  const setApp = useContext(SetApp);
  const { setAppointments } = useSetAccount();
  const tryCatchFinally = useTryCatchFinally();

  const bookAppointment = useCallback(() => {
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
  }, [appointment, history, setApp, setAppointments, tryCatchFinally]);

  return {
    loggedIn,
    appointment,
    bookAppointment,
  };
}
