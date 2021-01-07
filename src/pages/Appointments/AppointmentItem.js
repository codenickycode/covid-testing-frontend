import React from 'react';

const AppointmentItem = ({ appointment, expand }) => {
  const { _id, date, time, tests, name, address, phone } = appointment;
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
    <div className='appointment-item-div'>
      {appointment.expanded ? (
        <div className='appointment-full'>
          <h1>{name}</h1>
          <div className='appointment-info'>
            <h2>Address:</h2>
            <p>{street}</p>
            <p>
              {city}, {state} {zip}
            </p>
          </div>
          <div className='appointment-info'>
            <h2>Phone:</h2>
            <p>{phone}</p>
          </div>
          <div className='appointment-info'>
            <h2>Time:</h2>
            <p>{time}</p>
          </div>
          <div className='appointment-info'>
            <h2>Test&#40;s&#41;:</h2>
            <p>
              <span id='tests-span'>{testsSpan}</span>
            </p>
          </div>
          <div className='appointment-info'>
            <h2>Instructions:</h2>
            <p>
              Please arrive 5 minutes before your scheduled appointment time.
            </p>
          </div>
        </div>
      ) : (
        <div className='appointment-preview'>
          <h1>
            {date}, {time}
          </h1>
          <p>
            <span id='tests-span'>{testsSpan}</span>
            in {city}
          </p>
        </div>
      )}
      <button type='button' onClick={() => expand(_id)}>
        V
      </button>
    </div>
  );
};

export default AppointmentItem;
