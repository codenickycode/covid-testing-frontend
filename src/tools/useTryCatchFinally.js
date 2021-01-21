import { useContext } from 'react';
import { SetApp } from '../Providers/Context.js';

export const useTryCatchFinally = () => {
  const setApp = useContext(SetApp);

  const tryCatchFinally = async (t, c, f) => {
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
        setApp((prevState) => ({ ...prevState, loggedIn: false }));
      if (c) c(error);
    } finally {
      setApp((prevState) => ({
        ...prevState,
        loading: false,
        error,
      }));
      if (f) f();
    }
  };

  return tryCatchFinally;
};
