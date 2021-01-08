import React from 'react';

const AccountItemJSX = ({
  field,
  preview,
  togglePassword,
  toggleEdit,
  edit,
  cancel,
  items,
  sub,
  input,
  handleInput,
  error,
}) => {
  console.log(input);
  return (
    <div className='account-item'>
      <div
        className='account-item-top'
        onClick={field === 'Password' ? togglePassword : toggleEdit}
      >
        <div className='account-item-text'>
          <h2>{field}</h2>
          <p>
            {field === 'Name'
              ? `${input.firstName} ${input.lastName}`
              : field === 'Password'
              ? 'XXXXXXXX'
              : preview || ''}
          </p>
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
              <label htmlFor={sub + item.key}>{item.label}</label>
              <input
                type={item.type}
                id={sub + item.key}
                maxLength={item.key === 'zip' ? '5' : '99'}
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

export default AccountItemJSX;
