import React, { useEffect, useRef } from 'react';
import { ReactComponent as Arrow } from '../../icons/arrow.svg';
import { SCROLL_OPTIONS } from '../../constants.js';

const AppointmentItem = ({ appointment, expand }) => {
  const previewRef = useRef(null);
  const fullRef = useRef(null);

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

  useEffect(() => {
    fullRef.current
      ? fullRef.current.scrollIntoView(SCROLL_OPTIONS)
      : previewRef.current.scrollIntoView(SCROLL_OPTIONS);
  }, [appointment.expanded]);

  const handleExpand = () => {
    expand(_id);
  };

  return (
    <div className='appointment-item-div'>
      <div ref={previewRef} className='appointment-preview'>
        <h3>
          {date}, {time}
        </h3>
        <p>
          <span>{testsSpan}</span> in {city}
        </p>
      </div>
      {appointment.expanded && (
        <div ref={fullRef} className='appointment-full'>
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
              <span className='appointment-tests-span'>{testsSpan}</span>
            </p>
          </div>
          <div className='appointment-item'>
            <h4>Instructions</h4>
            <p>
              Please arrive 5 minutes before your scheduled appointment time.
            </p>
          </div>
        </div>
      )}

      <Arrow
        className={
          appointment.expanded
            ? 'btn-small icon deg90'
            : 'btn-small icon deg270'
        }
        onClick={handleExpand}
      />
    </div>
  );
};

export default AppointmentItem;
