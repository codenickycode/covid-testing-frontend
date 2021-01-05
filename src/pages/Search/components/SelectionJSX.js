import React from 'react';
import Times from './Times.js';

const SelectionJSX = ({
  selection,
  date,
  selectTime,
  selectTest,
  handleSubmit,
}) => {
  const { name, phone, address, tests, available } = selection;

  return (
    <form id='form-confirm' className='form' onSubmit={handleSubmit}>
      <div className='location-selection'>
        <h1>{name}</h1>
        <div className='location-basic'>
          <h3>Address</h3>
          <p>{phone}</p>
          <p>{address.street}</p>
          <p>
            {address.city}, {address.state} {address.zip}
          </p>
        </div>
        <div className='location-date'>
          <h3>Date</h3>
          <p>{date}</p>
        </div>
        <div className='select-time'>
          <Times times={available} selectTime={selectTime} />
        </div>
        <div className='location-tests'>
          <h4>Tests:</h4>
          <ul>
            {tests.map((test, index) => {
              return (
                <li key={index} onClick={() => selectTest(test)}>
                  {test}
                </li>
              );
            })}
          </ul>
        </div>
        <h4>Instruction:</h4>
        <p>
          Arrive at the clinic 5 minutes before your appointment and wait for
          your name to be called.
        </p>
        <h1>Looks good?</h1>
        <button type='submit' id='btn-confirm' disabled={false}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default SelectionJSX;
