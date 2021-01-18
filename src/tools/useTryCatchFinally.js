import { useContext } from 'react';
import { SetApp, SetNavDisabled } from '../Providers/ContextProvider.js';

export const useTryCatchFinally = () => {
  const setApp = useContext(SetApp);
  const setNavDisabled = useContext(SetNavDisabled);

  const tryCatchFinally = async (t, tArgs = [], c, f) => {
    let error = '';
    try {
      setApp((prevState) => ({
        ...prevState,
        loading: true,
      }));
      setNavDisabled(true);
      await t(...tArgs);
    } catch (e) {
      console.log(e);
      error = e.hasOwnProperty('response') ? e.response.data : e.message;
      if (e.status === 401)
        setApp((prevState) => ({ ...prevState, loggedIn: false }));
      if (c) c(error);
    } finally {
      setNavDisabled(false);
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
