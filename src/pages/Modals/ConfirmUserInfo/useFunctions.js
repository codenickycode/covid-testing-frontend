import { useContext } from 'react';
import axios from 'axios';
import { useSetAllAccount } from '../../../Providers/Account.js';
import { SetApp } from '../../../Providers/Context.js';
import useCustomHooks from '../../../tools/useCustomHooks';

export default function useFunctions() {
  const setApp = useContext(SetApp);
  const setAllAccount = useSetAllAccount();
  const { tryCatchFinally } = useCustomHooks();

  const checkValid = (inputs) => {
    let errors = {};
    let interupt = false;
    for (let [name, val] of Object.entries(inputs)) {
      if (!val) {
        errors[name] = 'required';
        document.querySelector(`input[name=${name}]`).focus();
        interupt = true;
      } else {
        errors[name] = '';
      }
    }
    return [errors, interupt];
  };

  const updateAccountBasic = (inputs, callback) => {
    tryCatchFinally(updateBasic);
    async function updateBasic() {
      const { firstName, lastName, phone, dob } = inputs;
      const res = await axios.post('/common/update/basic', {
        name: { firstName, lastName },
        phone: { phone },
        dob: { dob },
      });
      setAllAccount({ ...res.data, headerName: res.data.name.firstName });
      callback();
      setApp((prev) => ({
        ...prev,
        confirmation: 'Appointment confirmed!',
      }));
    }
  };

  return { checkValid, updateAccountBasic };
}
