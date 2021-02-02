import { useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { SetApp, INIT_APP, App } from '../../Providers/Context';

export const LogoutButton = () => {
  const history = useHistory();
  const { loading } = useContext(App);
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
      setApp({
        ...INIT_APP,
        settings: { dark: false, remember: false },
        error,
        confirmation,
      });
    }
  }

  return (
    <button type='button' className='btn' onClick={logout} disabled={loading}>
      Logout
    </button>
  );
};
