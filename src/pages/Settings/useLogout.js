import { useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { SetApp, INIT_APP } from '../../Providers/Context';

export default function useLogout() {
  const history = useHistory();
  const setApp = useContext(SetApp);

  async function logout() {
    history.push('/');
    localStorage.clear();
    sessionStorage.clear();
    setApp((prev) => ({ ...prev, loading: true }));
    let error = '';
    let confirmation = '';
    try {
      const res = await axios.get('/common/logout');
      confirmation = res.data;
    } catch (e) {
      error = e.response?.data || e.message;
    } finally {
      setApp({ ...INIT_APP, error, confirmation });
    }
  }

  return logout;
}