import React from 'react';
import Times from './Times.js';
import { ReactComponent as ArrowCircleIcon } from '../../../icons/ArrowCircle.svg';
import { ReactComponent as Logo } from '../../../icons/Logo.svg';
import { ReactComponent as LocationIcon } from '../../../icons/Location.svg';
import { ReactComponent as DateIcon } from '../../../icons/Calendar.svg';
import { ReactComponent as TimeIcon } from '../../../icons/TimeCircle.svg';
import { ReactComponent as TestIcon } from '../../../icons/Document.svg';
import { ReactComponent as InfoIcon } from '../../../icons/InfoSquare.svg';

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
        <div className='with-spacer'>
          <Logo />
          <h1>{name}</h1>
        </div>
        <div className='item'>
          <LocationIcon />
          <div>
            <h2 id='selection-address'>Address</h2>
            <p className='p-bottom-half'>
              {'(' + phone.substr(0, 3) + ')' + phone.substr(3)}
            </p>
            <p>
              {address.street}, {address.city}, {address.state} {address.zip}
            </p>
          </div>
        </div>
        <div className='item'>
          <DateIcon />
          <div>
            <h2 id='selection-date'>Date</h2>
            <div className='date-picker-left'>
              <ArrowCircleIcon
                className='icon deg180'
                onClick={() => handleChangeDate('dec')}
              />
              <p>{date}</p>
              <ArrowCircleIcon
                className='icon'
                onClick={() => handleChangeDate('inc')}
              />
            </div>
          </div>
        </div>
        <div id='time-item'>
          <div className='with-spacer'>
            <TimeIcon />
            <h2>
              Time <span className='smaller red'>*required</span>
            </h2>
          </div>
          <Times times={available} time={time} setTime={setTime} />
        </div>
        <div className='item'>
          <TestIcon />
          <div>
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
        </div>
        <div className='item'>
          <InfoIcon />
          <div>
            <h2 id='selection-instructions'>Instructions</h2>
            <p>
              Please arrive at the clinic no more than 5 minutes before your
              appointment. Please wear a mask and maintain 6-foot distance.
            </p>
          </div>
        </div>
        <h1>Looks good?</h1>
        <button
          type='submit'
          className='btn'
          disabled={!time || selectedTests.length === 0}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default SelectionJSX;
