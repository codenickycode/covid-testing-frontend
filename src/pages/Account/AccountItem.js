import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as tools from '../Search/tools/tools.js';

const Saving = () => <h1>Saving...</h1>;

const getUserField = (key) => {
  return JSON.parse(sessionStorage.getItem(key));
};

const setUserField = (key, val) => {
  sessionStorage.setItem(key, JSON.stringify(val));
};

const AccountItem = ({ title, field, items }) => {
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [edit, setEdit] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [input, setInput] = useState(getUserField(field));
  const [prevInput, setPrevInput] = useState(getUserField(field));
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (field === 'password') return;
    if (field === 'name') {
      setPreview(`${input.firstName} ${input.lastName}`);
    } else {
      setPreview(input[items[0].key]);
    }
  });

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
      if (input.newPassword !== input.confirmNewPassword)
        return setError("Confirmation doesn't match");
      let submitInput = { ...input };
      delete submitInput.confirmNewPassword;
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

  const save = async () => {
    try {
      setSaving(true);
      const res = await axios.post(`/common/update/${field}`, input);
      if (field === 'password') {
        setInput(getUserField(field));
      } else {
        setUserField(field, res.data[field]);
        setPrevInput(res.data[field]);
      }
      setUpdated(false);
    } catch (e) {
      const error = e.hasOwnProperty('response') ? e.response.data : e.message;
      setError(error);
    } finally {
      setSaving(false);
    }
  };

  const cancel = (e) => {
    e.stopPropagation();
    setInput(prevInput);
    setUpdated(false);
    setEdit(false);
  };

  return saving ? (
    <Saving />
  ) : (
    <div className='account-item'>
      <div
        className='account-item-top'
        onClick={field === 'password' ? togglePassword : toggleEdit}
      >
        <div className='account-item-text'>
          <h2>{title}</h2>
          <p>{preview}</p>
        </div>
        <button type='button'>{edit ? 'save' : 'edit'}</button>
        {edit && (
          <button type='button' onClick={cancel}>
            Cancel
          </button>
        )}
      </div>
      {edit &&
        items.map((item, index) => {
          return (
            <div key={index} className='account-item-input-div'>
              <label htmlFor={field + item.key}>{item.label}</label>
              <input
                type={item.type}
                id={field + item.key}
                maxLength={item.key === 'zip' ? '5' : '99'}
                placeholder={
                  item.key === 'currentPassword' || item.key === 'id'
                    ? '[hidden]'
                    : ''
                }
                value={input[item.key]}
                onChange={(e) => handleInput(e, item.key)}
              />
              {error && <p>{error}</p>}
            </div>
          );
        })}
    </div>
  );
};

export default AccountItem;
