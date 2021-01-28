import { useContext } from 'react';
import axios from 'axios';
import { SetApp } from '../../../Providers/Context.js';

export default function useFunctions() {
  const setApp = useContext(SetApp);

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

  const updateAccountBasic = async (inputs, callback) => {
    let user = null,
      error = '',
      confirmation = '';
    try {
      setApp((prev) => ({ ...prev, loading: true }));
      const { firstName, lastName, phone, dob } = inputs;
      const res = await axios.post('/common/update/basic', {
        name: { firstName, lastName },
        phone: { phone },
        dob: { dob },
      });
      user = res.data;
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
        headerName: user?.name?.firstName || '',
      }));
      if (callback) callback();
    }
  };

  return { checkValid, updateAccountBasic };
}
