import { useContext } from 'react';
import { SetAppContext } from '../Providers/AppContextProvider.js';

export const useTryCatchFinally = () => {
  const { setLoading, setError } = useContext(SetAppContext);

  const tryCatchFinally = async (t, tArgs, c, f) => {
    try {
      setLoading(true);
      await t(...tArgs);
      setError('');
    } catch (e) {
      const error = e.hasOwnProperty('response') ? e.response.data : e.message;
      setError(error);
      if (c) c();
    } finally {
      if (f) f();
      setLoading(false);
    }
  };

  return tryCatchFinally;
};
