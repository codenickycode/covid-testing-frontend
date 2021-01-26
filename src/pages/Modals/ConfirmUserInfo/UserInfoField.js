import React from 'react';

export default function UserInfoField({
  field,
  label,
  input,
  error,
  handleInput,
}) {
  return (
    <div id={`confirm-${field}`}>
      {error && <h2 className='error'>{error}</h2>}
      <label htmlFor={field}>{label}</label>
      <input
        className={error ? 'invalid' : ''}
        type={field === 'date' ? 'date' : field === 'phone' ? 'tel' : 'text'}
        name={field}
        value={input}
        onChange={handleInput}
      />
    </div>
  );
}
