import React from 'react';
import Times from './Times.js';
import { ReactComponent as Arrow } from '../../../icons/arrow.svg';

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
    <div className='selection-div'>
      <form id='form-confirm' onSubmit={handleSubmit}>
        <div className='selection-info'>
          <h2>{name}</h2>
          <div className='appointment-item'>
            <h4>Address</h4>
            <p>{phone}</p>
            <p>{address.street}</p>
            <p>
              {address.city}, {address.state} {address.zip}
            </p>
          </div>
          <div className='appointment-item'>
            <h4>Date</h4>
            <div className='date-picker-left'>
              <div className='icon' onClick={() => handleChangeDate('dec')}>
                <Arrow />
              </div>
              <p>{date}</p>
              <div
                className='icon deg180'
                onClick={() => handleChangeDate('inc')}
              >
                <Arrow />
              </div>
            </div>
          </div>
          <div className='appointment-item'>
            <h4>
              Time <span className='info-small'>*required</span>
            </h4>
            <Times times={available} time={time} setTime={setTime} />
          </div>
          <div className='appointment-item'>
            <h4>
              Tests <span className='info-small'>*required</span>
            </h4>
            <ul>
              {tests.map((test, index) => {
                return (
                  <li
                    key={index}
                    className={
                      selectedTests.indexOf(test) !== -1 ? 'test-selected' : ''
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
            <h4>Instruction</h4>
            <p>
              Arrive at the clinic 5 minutes before your appointment and wait
              for your name to be called.
            </p>
          </div>
          <h2>Looks good?</h2>
          <button type='submit' className='btn' disabled={false}>
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default SelectionJSX;
