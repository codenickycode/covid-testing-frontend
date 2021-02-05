import React from 'react';
import { ButtonSml, Input } from '../../components';
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
    <ButtonSml onClick={cancel} label='Cancel' />
  ) : (
    <div></div>
  );
};

export const SaveOrEditBtns = ({ state }) => {
  return (
    <ButtonSml
      addClass={state.edit ? '' : 'b-none'}
      label={state.edit ? 'save' : <EditIcon className='icon' />}
    />
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
