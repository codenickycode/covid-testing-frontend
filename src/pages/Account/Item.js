import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import axios from 'axios';
import tools from '../../tools/index.js';
import { App, SetApp } from '../../Providers/Context';
import { AccountItemSkeleton } from '../../components/Skeletons.js';

const USER_ERROR = 'USER_ERROR';
const SAVING = 'SAVING';
const EDIT = 'EDIT';
const UPDATED = 'UPDATED';
const INPUT = 'INPUT';
const PREV_INPUT = 'PREV_INPUT';
const PREVIEW = 'PREVIEW';

const AccountItem = ({ title, field, items }) => {
  const { user } = useContext(App);
  const setApp = useContext(SetApp);

  const editRef = useRef(null);

  const [state, setState] = useState({
    [USER_ERROR]: '',
    [SAVING]: false,
    [EDIT]: false,
    [UPDATED]: false,
    [INPUT]: user[field],
    [PREV_INPUT]: user[field],
    [PREVIEW]: '',
  });

  const setOne = useCallback(
    (key, val) => setState((prev) => ({ ...prev, [key]: val })),
    [setState]
  );

  // if user error, re-edit
  useEffect(() => {
    if (state[USER_ERROR] && !state[EDIT]) {
      setOne(EDIT, true);
    }
  }, [state, setOne]);

  // set preview item
  useEffect(() => {
    if (field === 'password') return;
    if (field === 'name') {
      setOne(PREVIEW, `${user.name.firstName} ${user.name.lastName}`);
    } else {
      setOne(PREVIEW, user[field][items[0].key]);
    }
  }, [field, user, items, setOne]);

  const toggleEdit = () => {
    if (state[SAVING]) return;
    if (!state[EDIT]) {
      setOne(EDIT, true);
    } else {
      if (state[UPDATED]) {
        save();
      }
      setOne(EDIT, false);
    }
  };

  useEffect(() => {
    if (state[EDIT]) tools.scrollIntoView(editRef);
  }, [state, editRef]);

  const togglePassword = () => {
    if (!state[EDIT]) {
      toggleEdit();
    } else {
      if (!tools.validPassword(state[INPUT].newPassword))
        return setOne(USER_ERROR, 'Invalid password');
      if (state[INPUT].newPassword !== state[INPUT].confirmNewPassword)
        return setOne(USER_ERROR, "Confirmation doesn't match");
      toggleEdit();
    }
  };

  const handleInput = (e, key) => {
    let val = e.target.value;
    if ((key === 'zip' || key === 'phone') && !tools.validNum(val)) return;
    setState((prev) => ({
      ...prev,
      [UPDATED]: val !== prev[PREV_INPUT][key],
      [INPUT]: { ...prev[INPUT], [key]: val },
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (field === 'password') togglePassword();
      else toggleEdit();
    }
    if (e.key === 'Escape') cancel(e);
  };

  const save = async () => {
    let post = { ...state[INPUT] };
    let newField = state[PREV_INPUT],
      newError = '';
    try {
      setOne(SAVING, true);
      setApp((prev) => ({ ...prev, navDisabled: true }));
      const res = await axios.post(`/common/update/${field}`, post);
      if (field !== 'password') {
        newField = res.data[field];
      }
      setApp((prev) => ({
        ...prev,
        user: { ...prev.user, [field]: newField },
      }));
    } catch (e) {
      newError = e.response?.data || e.message;
    } finally {
      setApp((prev) => ({ ...prev, navDisabled: false }));
      setState((prev) => ({
        ...prev,
        [EDIT]: false,
        [SAVING]: false,
        [UPDATED]: false,
        [USER_ERROR]: newError,
        [PREV_INPUT]: newField,
      }));
    }
  };

  const cancel = (e) => {
    e.stopPropagation();
    setState((prev) => ({
      ...prev,
      [UPDATED]: false,
      [USER_ERROR]: '',
      [EDIT]: false,
      [INPUT]: state[PREV_INPUT],
    }));
  };

  return state[SAVING] ? (
    <AccountItemSkeleton message='Saving...' />
  ) : (
    <div className='account-item'>
      <div
        className='account-item-top'
        onClick={field === 'password' ? togglePassword : toggleEdit}
      >
        <div className='account-item-text'>
          <h4>{title}</h4>
          <p className='label-small'>{state[PREVIEW]}</p>
          {state[USER_ERROR] && <p className='error'>{state[USER_ERROR]}</p>}
        </div>
        {state[EDIT] ? (
          <button type='button' className='btn-small' onClick={cancel}>
            Cancel
          </button>
        ) : (
          <div></div>
        )}
        <button type='button' className='btn-small'>
          {state[EDIT] ? 'save' : 'edit'}
        </button>
      </div>
      {state[EDIT] &&
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
                value={state[INPUT][item.key]}
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
