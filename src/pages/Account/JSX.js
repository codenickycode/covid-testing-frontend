import React from 'react';
import { Input } from '../../components';
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

export const Inputs = ({ fields, state, handleInput, handleKeyDown }) => {
  return (
    <form className='item-inputs'>
      {fields.map((field) => {
        return (
          <div
            className='account-input'
            key={field + '-div'}
            onKeyDown={handleKeyDown}
          >
            <Input
              field={field}
              value={state.input[field]}
              onChange={(e) => handleInput(e, field)}
            />
          </div>
        );
      })}
    </form>
  );
};
