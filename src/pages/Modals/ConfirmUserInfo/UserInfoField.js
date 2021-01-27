import React from 'react';
import { ReactComponent as ProfileIcon } from '../../../icons/Profile.svg';
import { ReactComponent as CalendarIcon } from '../../../icons/Calendar.svg';
import { ReactComponent as CallIcon } from '../../../icons/Call.svg';

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
      <div className='with-spacer'>
        {field === 'dob' ? (
          <CalendarIcon />
        ) : field === 'phone' ? (
          <CallIcon />
        ) : (
          <ProfileIcon />
        )}
        <label htmlFor={field}>{label}</label>
      </div>
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
