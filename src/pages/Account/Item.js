import React, { useRef, useEffect, useContext, useReducer } from 'react';
import axios from 'axios';
import tools from '../../tools/index.js';
import { SetApp } from '../../Providers/Context';
import { AccountItemSkeleton } from '../../components/Skeletons.js';
import { getSS } from '../../tools/storage.js';
import { ItemJSX } from './ItemJSX';
import { reducer, ACTIONS } from './reducer';

export const AccountItem = ({ title, field, items, icon }) => {
  let user = getSS('app').user;
  const setApp = useContext(SetApp);

  const INITIAL_STATE = {
    userError: '',
    saving: false,
    updated: false,
    input: user[field],
    prevInput: user[field],
    preview: null,
    edit: false,
  };
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const editRef = useRef(null);

  useEffect(() => {
    if (state.preview === null) {
      dispatch({
        type: ACTIONS.SET_PREVIEW,
        payload: state.prevInput[items[0].key],
      });
    }
  }, [field, state, items]);

  useEffect(() => {
    if (state.userError && !state.edit) dispatch({ type: ACTIONS.OPEN });
  }, [state]);

  useEffect(() => {
    if (state.edit && editRef.current) tools.scrollIntoView(editRef, 'end');
  }, [state, editRef]);

  useEffect(() => {
    if (state.saving) setApp((prev) => ({ ...prev, navDisabled: true }));
  }, [state, setApp]);

  const handleToggle = () => {
    if (field === 'password') togglePassword(field, state, dispatch, setApp);
    else toggleEdit(field, state, dispatch, setApp);
  };

  const toggleEdit = () => {
    if (state.saving) return;
    if (!state.edit) dispatch({ type: ACTIONS.OPEN });
    else {
      if (state.updated) save();
      dispatch({ type: ACTIONS.CLOSE });
    }
  };

  const togglePassword = () => {
    if (!state.edit) {
      toggleEdit();
    } else if (!tools.validPassword(state.input.newPassword)) {
      dispatch({
        type: ACTIONS.SET_USER_ERROR,
        payload: 'Invalid password',
      });
    } else if (state.input.newPassword !== state.input.confirmNewPassword) {
      dispatch({
        type: ACTIONS.SET_USER_ERROR,
        payload: "Confirmation doesn't match",
      });
    } else {
      toggleEdit();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleToggle();
    if (e.key === 'Escape') cancel(e);
  };

  const handleInput = ({ target: { value } }, key) => {
    if ((key === 'zip' || key === 'phone') && !tools.validNum(value)) return;
    dispatch({ type: ACTIONS.INPUT, payload: { key, value } });
  };

  const cancel = (e) => {
    e.stopPropagation();
    dispatch({ type: ACTIONS.CANCEL });
  };

  const save = async () => {
    dispatch({ type: ACTIONS.SET_SAVING, payload: true });
    const req = { ...state.input };
    if (field === 'password') delete req.confirmNewPassword;
    let newField = { ...state.prevInput },
      newError = '';
    try {
      const res = await axios.post(`/common/update/${field}`, req);
      if (field !== 'password') newField = res.data[field];
    } catch (e) {
      newError = e.response?.data || e.message;
    } finally {
      dispatch({ type: ACTIONS.AFTER_SAVE, payload: { newField, newError } });
      setApp((prev) => ({
        ...prev,
        user: { ...prev.user, [field]: newField },
        navDisabled: false,
      }));
    }
  };

  return state.saving ? (
    <AccountItemSkeleton message='Saving...' />
  ) : (
    <ItemJSX
      handleToggle={handleToggle}
      handleKeyDown={handleKeyDown}
      handleInput={handleInput}
      icon={icon}
      state={state}
      title={title}
      cancel={cancel}
      items={items}
      field={field}
      editRef={editRef}
    />
  );
};
