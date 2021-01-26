import React from 'react';
import Times from './Times.js';
import { ReactComponent as ArrowCircleIcon } from '../../../icons/ArrowCircle.svg';

const SelectionJSX = ({
  selection,
  date,
  handleChangeDate,
  time,
  setTime,
  selectTest,
  selectedTests,
  handleSubmit,
}) => {
  const { name, phone, address, tests, available } = selection;

  return (
    <div id='selection'>
      <form onSubmit={handleSubmit}>
        <h1 id='selection-name'>
          <span className='logo'></span>
          {name}
        </h1>
        <div className='item'>
          <h2 id='selection-address'>Address</h2>
          <p>{phone}</p>
          <p>
            {address.street}, {address.city}, {address.state} {address.zip}
          </p>
        </div>
        <div className='item'>
          <h2 id='selection-date'>Date</h2>
          <div className='date-picker-left'>
            <div
              className='icon deg180'
              onClick={() => handleChangeDate('dec')}
            >
              <ArrowCircleIcon />
            </div>
            <p>{date}</p>
            <div className='icon' onClick={() => handleChangeDate('inc')}>
              <ArrowCircleIcon />
            </div>
          </div>
        </div>
        <div className='item'>
          <h2 id='selection-time'>
            Time <span className='smaller red'>*required</span>
          </h2>
          <Times times={available} time={time} setTime={setTime} />
        </div>
        <div className='item'>
          <h2 id='selection-test'>
            Test Types <span className='smaller red'>*required</span>
          </h2>
          <ul>
            {tests.map((test, index) => {
              return (
                <li
                  key={index}
                  className={
                    selectedTests.indexOf(test) !== -1
                      ? 'btn-small test-selected'
                      : 'btn-small'
                  }
                  onClick={() => selectTest(test)}
                >
                  {test}
                </li>
              );
            })}
          </ul>
        </div>
        <div className='appointment-item'>
          <h2 id='selection-instructions'>Instruction</h2>
          <p>
            Please arrive at the clinic no more than 5 minutes before your
            appointment. Please wear a mask and maintain 6-foot distance.
          </p>
        </div>
        <h1>Looks good?</h1>
        <button type='submit' className='btn' disabled={false}>
          Continue
        </button>
      </form>
    </div>
  );
};

export default SelectionJSX;
