import { useContext } from 'react';
import axios from 'axios';
import { api, options } from '../../../api';
import { SetApp } from '../../../Providers/Context';

export default function useBookAppointment() {
  const setApp = useContext(SetApp);

  async function bookAppointment(appointment) {
    let user = null,
      error = '',
      confirmation = '';
    try {
      setApp((prev) => ({ ...prev, loading: true }));
      const res = await axios.post(`${api}/appointments`, appointment, options);
      user = res.data.user;
      confirmation = res.data.confirmation;
    } catch (e) {
      console.log(e);
      error = e.response?.data || e.message;
    } finally {
      setApp((prev) => ({
        ...prev,
        loading: false,
        error,
        confirmation,
        user,
      }));
    }
  }
  return bookAppointment;
}
