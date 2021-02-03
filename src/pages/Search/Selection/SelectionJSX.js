import React from 'react';
// import Times from './Times.js';
import { ReactComponent as ArrowIcon } from '../../../icons/Arrow.svg';
import { ReactComponent as Logo } from '../../../icons/Logo.svg';
import { ReactComponent as LocationIcon } from '../../../icons/Location.svg';
import { ReactComponent as DateIcon } from '../../../icons/Calendar.svg';
import { ReactComponent as TimeIcon } from '../../../icons/TimeCircle.svg';
import { ReactComponent as TestIcon } from '../../../icons/Document.svg';
import { ReactComponent as InfoIcon } from '../../../icons/InfoSquare.svg';
import { ReactComponent as Spacer } from '../../../icons/Spacer.svg';

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
    <div id='selection' className='page transition show'>
      <form onSubmit={handleSubmit}>
        <div className='item with-icon'>
          <Logo />
          <h1>{name}</h1>
        </div>
        <div className='item'>
          <div className='with-icon'>
            <LocationIcon />
            <h2>Address</h2>
          </div>
          <div className='with-icon'>
            <Spacer />
            <div>
              <p className='p-bottom-half'>
                {'(' + phone.substr(0, 3) + ')' + phone.substr(3)}
              </p>
              <p>
                {address.street}, {address.city}, {address.state} {address.zip}
              </p>
            </div>
          </div>
        </div>
        <div className='item'>
          <div className='with-icon'>
            <DateIcon />
            <h2>Date</h2>
          </div>
          <div className='date-picker-left'>
            <ArrowIcon
              className='icon deg180'
              onClick={() => handleChangeDate('dec')}
            />
            <p>{date}</p>
            <ArrowIcon
              className='icon'
              onClick={() => handleChangeDate('inc')}
            />
          </div>
        </div>
        <div className='item'>
          <div className='with-icon'>
            <TimeIcon />
            <h2>
              Time <span className='required'>*required</span>
            </h2>
          </div>
          <div className='with-icon'>
            <Spacer />
            <select
              className={!time ? 'select-error' : ''}
              defaultValue='default'
              onChange={(e) => setTime(e.target.value)}
            >
              <option disabled value='default'>
                Choose time
              </option>
              {available.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='item'>
          <div className='with-icon'>
            <TestIcon />
            <h2 id='selection-test'>
              Test Types <span className='smaller red'>*required</span>
            </h2>
          </div>
          <div className='with-icon'>
            <Spacer />
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
          <div className='with-icon'>
            <InfoIcon />
            <h2 id='selection-instructions'>Instructions</h2>
          </div>
          <div className='with-icon'>
            <Spacer />
            <p>
              Please arrive at the clinic no more than 5 minutes before your
              appointment. <br />
              <br />
              Please wear a mask and maintain 6-foot distance.
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
