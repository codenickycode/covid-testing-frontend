import React from 'react';
import { ReactComponent as EditIcon } from '../../icons/PencilLine.svg';

export const ItemJSX = ({
  handleToggle,
  handleKeyDown,
  handleInput,
  icon,
  state,
  title,
  cancel,
  items,
  field,
  editRef,
}) => {
  return (
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
        <form className='item-inputs'>
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
        </form>
      )}
      {!state.edit && <hr />}
    </div>
  );
};
