import { useContext } from 'react';
import {
  Name,
  Phone,
  Dob,
  useSetAllAccount,
} from '../../../Providers/Account.js';
import { App, SetApp } from '../../../Providers/Context.js';
import { useTryCatchFinally } from '../../../tools/useTryCatchFinally.js';

const useUserBasic = () => {
  const name = useContext(Name);
  const phone = useContext(Phone);
  const dob = useContext(Dob);

  const USER_BASIC = {
    inputs: {
      firstName: name.firstName || '',
      lastName: name.lastName || '',
      phone: phone.phone || '',
      dob: dob.dob || '',
    },
    errors: {},
    labels: {
      firstName: 'First',
      lastName: 'Last',
      phone: 'Phone',
      dob: 'Date of Birth',
    },
  };
  Object.keys(USER_BASIC.inputs).forEach(
    (field) => (USER_BASIC.errors[field] = '')
  );

  return USER_BASIC;
};

export default function useCustomHooks() {
  const { loading } = useContext(App);
  const setApp = useContext(SetApp);
  const setAllAccount = useSetAllAccount();
  const tryCatchFinally = useTryCatchFinally();
  const USER_BASIC = useUserBasic();

  return {
    loading,
    setApp,
    setAllAccount,
    tryCatchFinally,
    USER_BASIC,
  };
}
