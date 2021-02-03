import React from 'react';
import { ReactComponent as EditIcon } from '../../icons/PencilLine.svg';

export const PreviewText = ({ state, title }) => {
  return (
    <div className='item-text'>
      {!state.edit && (
        <>
          <h2>{title}</h2>
          <p className='light'>{state.preview}</p>{' '}
        </>
      )}
      {state.userError && <p className='error'>{state.userError}</p>}
    </div>
  );
};

export const CancelBtnOrEmpty = ({ state, cancel }) => {
  return state.edit ? (
    <button type='button' className='btn-small' onClick={cancel}>
      Cancel
    </button>
  ) : (
    <div></div>
  );
};

export const SaveOrEditBtns = ({ state }) => {
  return (
    <button
      type='button'
      className={state.edit ? 'btn-small' : 'btn-small b-none'}
    >
      {state.edit ? 'save' : <EditIcon className='icon' />}
    </button>
  );
};

export const Inputs = ({ state, items, field, handleInput, handleKeyDown }) => {
  return (
    <form className='item-inputs'>
      {items.map((item, index) => {
        return (
          <div className='account-input' key={index}>
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
    </form>
  );
};
