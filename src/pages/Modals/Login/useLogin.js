import { useContext } from 'react';
import axios from 'axios';
import useCustomHooks from '../../../tools/useCustomHooks.js';
import { SetApp } from '../../../Providers/Context.js';
import { useSetAllAccount } from '../../../Providers/Account.js';

export default function useLogin() {
  const { tryCatchFinally } = useCustomHooks();
  const setApp = useContext(SetApp);
  const setAllAccount = useSetAllAccount();

  const login = (type, email, password) => {
    tryCatchFinally(login);
    async function login() {
      const res = await axios.post(`/common/${type}`, {
        email,
        password,
      });
      setAllAccount({ ...res.data, headerName: res.data.name.firstName });
      setApp((prevState) => ({
        ...prevState,
        loggedIn: true,
        confirmation: 'Logged in!',
      }));
      localStorage.remember = res.data.preferences.remember;
      localStorage.dark = res.data.preferences.dark;
    }
  };

  return login;
}
