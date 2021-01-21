import React, { useRef, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as tools from '../../tools/tools.js';
import { SCROLL_OPTIONS } from '../../constants.js';
import { SetNavDisabled } from '../../Providers/ContextProvider.js';
import { AccountItemSkeleton } from '../Skeletons.js';

const AccountItem = ({ title, field, items, input, setContext, setHeader }) => {
  console.log('rendering: ' + field);

  const setNavDisabled = useContext(SetNavDisabled);

  const editRef = useRef(null);

  const [userError, setUserError] = useState('');
  const [saving, setSaving] = useState(false);
  const [edit, setEdit] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [prevInput, setPrevInput] = useState(input);
  const [preview, setPreview] = useState('');

  // if user error, re-edit
  useEffect(() => {
    if (userError) {
      setEdit(true);
    }
  }, [userError, setEdit]);

  // preview item
  useEffect(() => {
    if (field === 'password') return;
    if (field === 'name') {
      setPreview(`${input.firstName} ${input.lastName}`);
    } else {
      setPreview(input[items[0].key]);
    }
  }, [field, input, items]);

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

  useEffect(() => {
    if (edit) {
      let itemBottom = editRef.current.getBoundingClientRect().bottom;
      let viewHeight = window.innerHeight;
      editRef.current.scrollIntoView(SCROLL_OPTIONS);
      window.scrollBy({
        left: 0,
        top: itemBottom - viewHeight + 160,
        behavior: 'smooth',
      });
    }
  }, [edit, editRef]);

  const togglePassword = () => {
    if (!edit) {
      toggleEdit();
    } else {
      if (!tools.validPassword(input.newPassword))
        return setUserError('Invalid password');
      if (input.newPassword !== input.confirmNewPassword)
        return setUserError("Confirmation doesn't match");
      let submitInput = { ...input };
      delete submitInput.confirmNewPassword;
      toggleEdit();
    }
  };

  const handleInput = (e, key) => {
    let val = e.target.value;
    if (
      (key === 'zip' || key === 'phone') &&
      val &&
      val[val.length - 1].match(/\D/)
    )
      return;
    setUpdated(val !== prevInput[key]);
    setContext({ ...input, [key]: val });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (field === 'password') togglePassword();
      else toggleEdit();
    }
    if (e.key === 'Escape') cancel(e);
  };

  const save = async () => {
    try {
      setSaving(true);
      setNavDisabled(true);
      const res = await axios.post(`/common/update/${field}`, input);
      if (field === 'password') {
        setContext(prevInput);
      } else {
        if (field === 'name') setHeader(res.data.name.firstName);
        setContext(res.data[field]);
        setPrevInput(res.data[field]);
      }
      setUpdated(false);
      setUserError('');
    } catch (e) {
      const userError = e.hasOwnProperty('response')
        ? e.response.data
        : e.message;
      setUserError(userError);
    } finally {
      setSaving(false);
      setNavDisabled(false);
    }
  };

  const cancel = (e) => {
    e.stopPropagation();
    setContext(prevInput);
    setUpdated(false);
    setUserError('');
    setEdit(false);
  };

  return saving ? (
    <AccountItemSkeleton message='Saving...' />
  ) : (
    <div className='account-item'>
      <div
        className='account-item-top'
        onClick={field === 'password' ? togglePassword : toggleEdit}
      >
        <div className='account-item-text'>
          <h4>{title}</h4>
          <p className='label-small'>{preview}</p>
          {userError && <p className='error'>{userError}</p>}
        </div>
        {edit ? (
          <button type='button' className='btn-small' onClick={cancel}>
            Cancel
          </button>
        ) : (
          <div></div>
        )}
        <button type='button' className='btn-small'>
          {edit ? 'save' : 'edit'}
        </button>
      </div>
      {edit &&
        items.map((item, index) => {
          return (
            <div key={index} ref={editRef} className='account-item-input-div'>
              <label htmlFor={field + item.key} className='label-small'>
                {item.label}
              </label>
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
                onKeyDown={handleKeyDown}
              />
            </div>
          );
        })}
    </div>
  );
};

export default AccountItem;
