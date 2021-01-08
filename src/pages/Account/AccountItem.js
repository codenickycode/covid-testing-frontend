import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import * as tools from '../Search/tools/tools.js';
import {
  User,
  SetUser,
  UserField,
  SetUserField,
} from '../../Providers/User.js';
import AccountItemJSX from './AccountItemJSX';

const AccountItem = ({ field, preview, update, sub, items }) => {
  const userField = useContext(UserField);
  const setUserField = useContext(SetUserField);
  const user = useContext(User);
  const setUser = useContext(SetUser);
  const [userData, setUserData] = useState(user);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const [edit, setEdit] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [input, setInput] = useState({});
  const [prevInput, setPrevInput] = useState({});

  const save = async () => {
    console.log(input);
    try {
      setSaving(true);
      const res = await axios.post(`/common/update/${update}`, input);
      setUser(res.data);
      setUserData(res.data);
      console.log(res.data);
    } catch (e) {
      const error = e.response.data || e.message;
      setError(error);
    } finally {
      setSaving(false);
    }
  };

  const cancel = (e) => {
    e.stopPropagation();
    setEdit(false);
  };

  const toggleEdit = () => {
    if (saving) return;
    if (!edit) {
      setEdit(true);
    } else {
      if (updated) {
        save();
      }
      setEdit(false);
    }
  };

  const togglePassword = () => {
    if (!edit) {
      toggleEdit();
    } else {
      if (!tools.validPassword(input.newPassword))
        return setError('Invalid password');
      if (input.newPassword !== input.currentPassword)
        return setError("Confirmation doesn't match");
      toggleEdit();
    }
  };

  const handleInput = (e, key) => {
    if (key === 'zip') {
      const val = e.target.value;
      if (val && val[val.length - 1].match(/\D/)) return;
    }
    if (e.target.value === prevInput[key]) {
      setUpdated(false);
    } else {
      setUpdated(true);
    }
    setInput({ ...input, [key]: e.target.value });
  };

  useEffect(() => {
    const initial = {};
    items.forEach((item) => {
      initial[item.key] = userData[item.key] || '';
    });
    setInput({ ...initial });
    setPrevInput({ ...initial });
  }, [items, userData]);

  return (
    <AccountItemJSX
      field={field}
      togglePassword={togglePassword}
      toggleEdit={toggleEdit}
      edit={edit}
      cancel={cancel}
      items={items}
      sub={sub}
      input={input}
      handleInput={handleInput}
      error={error}
    />
  );
};

export default AccountItem;
