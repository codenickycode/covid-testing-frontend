import React, { useState, useEffect, useRef } from 'react';
import { scrollIntoView } from '../../tools/scrolling.js';

const AppointmentItem = ({ appointment, expand }) => {
  const previewRef = useRef(null);
  const fullRef = useRef(null);
  const [clicked, setClicked] = useState(false);

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
    if (clicked) {
      if (fullRef.current) {
        scrollIntoView(fullRef);
      } else {
        scrollIntoView(previewRef);
      }
    }
  }, [clicked, appointment.expanded]);

  const handleExpand = () => {
    setClicked(true);
    expand(_id);
  };

  return (
    <div className='item'>
      <div
        ref={previewRef}
        className={appointment.expanded ? 'appt full' : 'appt preview'}
        onClick={handleExpand}
      >
        <h2>
          {date}, {time}
        </h2>
        <p>
          <span>{testsSpan}</span> in {city}
        </p>
      </div>
      {appointment.expanded && (
        <div ref={fullRef}>
          <h1>{name}</h1>
          <div>
            <h2 className='icon-address'>Address</h2>
            <p>{street}</p>
            <p>
              {city}, {state} {zip}
            </p>
          </div>
          <div>
            <h2 className='icon-phone'>Phone</h2>
            <p>{phone}</p>
          </div>
          <div>
            <h2 className='icon-time'>Time</h2>
            <p>{time}</p>
          </div>
          <div>
            <h2 className='icon-test'>Test&#40;s&#41;</h2>
            <p>
              <span className='test-span'>{testsSpan}</span>
            </p>
          </div>
          <div>
            <h2 className='icon-instructions'>Instructions</h2>
            <p>
              Please arrive 5 minutes before your scheduled appointment time.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentItem;
