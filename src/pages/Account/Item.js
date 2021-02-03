import React, { useRef, useEffect, useContext, useReducer } from 'react';
import axios from 'axios';
import tools from '../../tools/index.js';
import { App } from '../../Providers/Context';
import { AccountItemSkeleton } from '../../components/Skeletons.js';
import { ReactComponent as EditIcon } from '../../icons/PencilLine.svg';

const AccountItem = ({ title, field, items, icon }) => {
  const { user } = useContext(App);

  const INITIAL_STATE = {
    userError: '',
    saving: false,
    updated: false,
    input: user[field],
    prevInput: user[field],
    preview: '',
    edit: false,
  };
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const editRef = useRef(null);

  useEffect(() => {
    setPreview(field, items, user, dispatch);
  }, [field, user, items]);

  useEffect(() => {
    if (state.userError && !state.edit) dispatch({ type: 'OPEN' });
  }, [state]);

  useEffect(() => {
    if (state.edit && editRef.current) tools.scrollIntoView(editRef, 'end');
  }, [state, editRef]);

  const handleToggle = () => {
    if (field === 'password') togglePassword(field, state, dispatch);
    else toggleEdit(field, state, dispatch);
  };

  const handleInput = ({ target: { value } }, key) => {
    if ((key === 'zip' || key === 'phone') && !tools.validNum(value)) return;
    dispatch({ type: 'INPUT', payload: { key, value } });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (field === 'password') togglePassword(state, dispatch);
      else toggleEdit(state, dispatch);
    }
    if (e.key === 'Escape') cancel(e);
  };

  const cancel = (e) => {
    e.stopPropagation();
    dispatch({ type: 'CANCEL' });
  };

  return state.saving ? (
    <AccountItemSkeleton message='Saving...' />
  ) : (
    <div className='item'>
      <div className='item-top' onClick={handleToggle}>
        {icon}
        <div className='item-text'>
          {!state.edit && (
            <>
              <h2>{title}</h2>
              <p className='light'>{state.preview}</p>{' '}
            </>
          )}
          {state.userError && <p className='error'>{state.userError}</p>}
        </div>
        {state.edit ? (
          <button type='button' className='btn-small' onClick={cancel}>
            Cancel
          </button>
        ) : (
          <div></div>
        )}
        <button
          type='button'
          className={state.edit ? 'btn-small' : 'btn-small b-none'}
        >
          {state.edit ? 'save' : <EditIcon className='icon' />}
        </button>
      </div>
      {state.edit && (
        <div className='item-inputs'>
          {items.map((item, index) => {
            return (
              <div className='account-input' key={index} ref={editRef}>
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
                  value={state.input[item.key]}
                  onChange={(e) => handleInput(e, item.key)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            );
          })}
        </div>
      )}
      {!state.edit && <hr />}
    </div>
  );
};

export default AccountItem;

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'OPEN':
      return { ...state, edit: true };
    case 'CLOSE':
      return { ...state, edit: false };
    case 'SET_PREVIEW':
      return { ...state, preview: payload };
    case 'INPUT':
      const { key, value } = payload;
      return {
        ...state,
        updated: value !== state.prevInput[key],
        input: { ...state.input, [key]: value },
      };
    case 'AFTER_SAVE':
      const { newError, newField } = payload;
      return {
        ...state,
        saving: false,
        updated: false,
        userError: newError,
        prev_input: newField,
        edit: false,
      };
    case 'CANCEL':
      return {
        ...state,
        updated: false,
        userError: '',
        edit: false,
        input: state.prevInput,
      };
    default:
      return state;
  }
};

const toggleEdit = (field, state, dispatch) => {
  if (state.saving) return;
  if (!state.edit) dispatch({ type: 'OPEN' });
  else {
    if (state.updated) save(field, { ...state.input }, dispatch);
    dispatch({ type: 'CLOSE' });
  }
};

const togglePassword = (field, state, dispatch) => {
  if (!state.edit) {
    toggleEdit(field, state, dispatch);
  } else {
    if (!tools.validPassword(state.input.newPassword))
      return dispatch({
        type: 'SET_USER_ERROR',
        payload: 'Invalid password',
      });
    if (state.input.newPassword !== state.input.confirmNewPassword)
      return dispatch({
        type: 'SET_USER_ERROR',
        payload: "Confirmation doesn't match",
      });
    else toggleEdit(field, state, dispatch);
  }
};

const save = async (field, req, dispatch) => {
  if (field === 'password') delete req.confirmNewPassword;
  let newField = { ...req },
    newError = '';
  try {
    const res = await axios.post(`/common/update/${field}`, req);
    if (field !== 'password') newField = res.data[field];
  } catch (e) {
    newError = e.response?.data || e.message;
  } finally {
    dispatch({ type: 'AFTER_SAVE', payload: { newField, newError } });
  }
};

const setPreview = (field, items, user, dispatch) => {
  if (field === 'password') return;
  if (field === 'name') {
    dispatch({
      type: 'SET_PREVIEW',
      payload: `${user.name.firstName} ${user.name.lastName}`,
    });
  } else {
    dispatch({ type: 'SET_PREVIEW', payload: user[field][items[0].key] });
  }
};
