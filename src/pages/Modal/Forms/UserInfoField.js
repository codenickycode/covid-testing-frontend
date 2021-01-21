import React from 'react';

export default function UserInfoField({
  field,
  label,
  input,
  error,
  handleInput,
}) {
  return (
    <>
      {error && <h2 className='error'>{error}</h2>}
      <label htmlFor={field} className='label-small'>
        <span className='info-small'>*</span>
        {label}
      </label>
      <input
        className={error ? 'invalid-field' : ''}
        type={
          field === 'newDate' ? 'date' : field === 'newPhone' ? 'tel' : 'text'
        }
        name={field}
        value={input}
        onChange={(e) => handleInput(e, field)}
      />
    </>
  );
}
