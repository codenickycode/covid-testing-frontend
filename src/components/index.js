import React from 'react';
import * as icons from '../icons';
// import { App } from '../Providers/Context';

export const Page = ({ id, children, addClass = '' }) => {
  // const { loading } = useContext(App);

  return (
    <div id={id} className={`page transition show ${addClass}`}>
      {children}
    </div>
  );
};
// <PageSkeleton id={`${id}-sk`} className={loading ? 'sk-show' : 'sk-hide}'} />;

export const Button = ({ onClick, label, autoFocus = false }) => {
  return (
    <button
      autoFocus={autoFocus}
      type='button'
      className='btn'
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export const ButtonSml = ({ onClick, label, addClass = '' }) => {
  return (
    <button type='button' className={'btn-small ' + addClass} onClick={onClick}>
      {label}
    </button>
  );
};

export const Submit = ({ label, disabled = false }) => {
  return (
    <button type='submit' className='btn' disabled={disabled}>
      {label}
    </button>
  );
};

export const WithIcon = ({ icon, addClass = '', children }) => {
  return (
    <div className={addClass + ' with-icon'}>
      {icon}
      {children}
    </div>
  );
};

export const PWRequirements = ({ error }) => {
  return (
    <p className={error ? 'error smaller password' : 'smaller password'}>
      min. 8 digits: lower, upper, and num
    </p>
  );
};

export const DatePicker = ({ handleChangeDate, date }) => {
  const ArrowLeft = icons.ArrowLeft;
  const ArrowRight = icons.ArrowRight;
  return (
    <div className='date-picker'>
      <ArrowLeft onClick={() => handleChangeDate('dec')} />
      <p className='date'>{date}</p>
      <ArrowRight onClick={() => handleChangeDate('inc')} />
    </div>
  );
};

export const Error = ({ error }) => {
  return <h2 className='error'>{error}</h2>;
};

export const Input = ({
  field,
  error,
  value,
  onChange,
  withIcon,
  autoFocus = false,
  placeholder = '',
}) => {
  const id = `input-${field}`;
  const labelId = `${id}-label`;
  const label = getLabel(field);
  const type = getType(field);
  return (
    <>
      {error && <Error error={error} />}
      {withIcon ? (
        <WithIcon icon={icons[field]}>
          <label id={labelId} htmlFor={id}>
            {label}
          </label>
        </WithIcon>
      ) : (
        <label id={labelId} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        autoFocus={autoFocus}
        id={id}
        name={field}
        type={type}
        className={error ? 'invalid' : ''}
        maxLength={field === 'zip' ? '5' : 99}
        value={value || ''}
        onChange={onChange}
        placeholder={
          field === 'currentPassword' || field === 'id'
            ? '[hidden]'
            : placeholder
        }
      />
    </>
  );
};

const getLabel = (field) => {
  switch (field) {
    case 'firstName':
      return 'First';
    case 'lastName':
      return 'Last';
    case 'dob':
      return 'Date of Birth';
    case 'newPassword':
      return 'New Password';
    case 'currentPassword':
      return 'Current Password';
    case 'confirmNewPassword':
      return 'Confirm New Password';
    default:
      return field.substr(0, 1).toUpperCase() + field.substr(1);
  }
};

const getType = (field) => {
  switch (field) {
    case 'phone':
      return 'tel';
    case 'dob':
      return 'date';
    case 'email':
      return 'email';
    case 'password':
    case 'confirmation':
    case 'currentPassword':
    case 'newPassword':
    case 'confirmNewPassword':
      return 'password';
    default:
      return 'text';
  }
};
