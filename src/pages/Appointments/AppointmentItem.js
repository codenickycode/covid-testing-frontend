import React from 'react';
import { ReactComponent as Arrow } from '../../icons/arrow.svg';

const AppointmentItem = ({ appointment, expand }) => {
  const { _id, date, time, location, tests } = appointment;
  const { name, address, phone } = location;
  const { street, city, state, zip } = address;

  let testsSpan = '';
  if (tests.length === 1) {
    testsSpan = tests[0] + ' test';
  } else {
    tests.forEach((test) => {
      testsSpan += test + ', ';
    });
    testsSpan = testsSpan.substr(0, testsSpan.length - 2) + ' tests';
  }

  return (
    <div>
      {appointment.expanded ? (
        <div className='appointment-full'>
          <div className='appointment-item'>
            <h4>Name</h4>
            <p>{name}</p>
          </div>
          <div className='appointment-item'>
            <h4>Address</h4>
            <p>{street}</p>
            <p>
              {city}, {state} {zip}
            </p>
          </div>
          <div className='appointment-item'>
            <h4>Phone</h4>
            <p>{phone}</p>
          </div>
          <div className='appointment-item'>
            <h4>Time</h4>
            <p>{time}</p>
          </div>
          <div className='appointment-item'>
            <h4>Test&#40;s&#41;</h4>
            <p>
              <span className='tests-span'>{testsSpan}</span>
            </p>
          </div>
          <div className='appointment-item'>
            <h4>Instructions</h4>
            <p>
              Please arrive 5 minutes before your scheduled appointment time.
            </p>
          </div>
        </div>
      ) : (
        <div className='appointment-preview' onClick={() => expand(_id)}>
          <h2>
            {date}, {time}
          </h2>
          <p>
            <span>{testsSpan}</span> in {city}
          </p>
        </div>
      )}
      <div onClick={() => expand(_id)}>
        <Arrow />
      </div>
    </div>
  );
};

export default AppointmentItem;
