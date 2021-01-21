const alertError = () => {
  setApp((prevState) => ({ ...prevState, error: 'I am an error!' }));
};
const alertConfirm = () => {
  setApp((prevState) => ({
    ...prevState,
    confirmation: 'I am a confirmation!',
  }));
};
const clearError = () => {
  setApp((prevState) => ({ ...prevState, error: '' }));
};
const clearConfirm = () => {
  setApp((prevState) => ({
    ...prevState,
    confirmation: '',
  }));
};

<div className='info-footer'>
  <div className='error'>{remember ? 'REMEMBER: TRUE' : 'REMEMBER: FALSE'}</div>
  <div className='error'>{loggedIn ? 'Logged in.' : 'Not logged in.'}</div>
  <div className='error'>{email.email || 'No email.'}</div>
  <button onClick={alertError}>Set Error</button>
  <button onClick={clearError}>Clear Error</button>
  <button onClick={alertConfirm}>Set Confirmation</button>
  <button onClick={clearConfirm}>Clear Confirmation</button>
</div>;
