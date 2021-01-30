import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as LocationIcon } from '../../icons/Location.svg';
import { ReactComponent as PhoneIcon } from '../../icons/Call.svg';
import { ReactComponent as CalendarIcon } from '../../icons/Calendar.svg';
import { ReactComponent as TimeIcon } from '../../icons/TimeCircle.svg';
import { ReactComponent as DocumentIcon } from '../../icons/Document.svg';
import { ReactComponent as InfoIcon } from '../../icons/InfoSquare.svg';
import { ReactComponent as Spacer } from '../../icons/Spacer.svg';
import { ReactComponent as Arrow } from '../../icons/Arrow.svg';
import { scrollIntoView } from '../../tools/scrolling';

const AppointmentItem = ({ appointment, expand }) => {
  const previewRef = useRef(null);
  const fullRef = useRef(null);
  const [clicked, setClicked] = useState(false);

  const { _id, date, time, location, tests } = appointment;
  const { name, address, phone } = location;
  const { street, city, state, zip } = address;

  let testsSpan = '';
  if (tests.length === 1) {
    testsSpan =
      tests[0].substr(0, 1).toUpperCase() + tests[0].substr(1) + ' test';
  } else {
    tests.forEach((test) => {
      testsSpan += test.substr(0, 1).toUpperCase() + test.substr(1) + ', ';
    });
    testsSpan = testsSpan.substr(0, testsSpan.length - 2) + ' tests';
  }

  const handleExpand = () => {
    setClicked(true);
    expand(_id);
  };

  useEffect(() => {
    if (clicked) {
      if (fullRef.current) {
        scrollIntoView(fullRef, 'start');
      } else if (previewRef.current) {
        scrollIntoView(previewRef, 'start');
      }
    }
  }, [clicked, appointment.expanded]);

  return (
    <div className='appt-item'>
      <Arrow
        className={appointment.expanded ? 'appt-btn-up' : 'appt-btn'}
        onClick={handleExpand}
      />
      <div ref={previewRef} className='preview' onClick={handleExpand}>
        {!appointment.expanded && (
          <>
            <h2>{date}</h2>
            <p className='preview-info'>
              <span className='preview-info'>{testsSpan}</span> in {city}
            </p>
          </>
        )}
      </div>
      {appointment.expanded && (
        <div className='expanded' ref={fullRef}>
          <h1>{name}</h1>
          <div className='appt-field'>
            <div className='with-icon'>
              <LocationIcon />
              <h2>Address</h2>
            </div>
            <div className='with-icon'>
              <Spacer />
              <p>
                {street}, {city}, {state} {zip}
              </p>
            </div>
          </div>
          <div className='appt-field'>
            <div className='with-icon'>
              <PhoneIcon />
              <h2>Phone</h2>
            </div>
            <div className='with-icon'>
              <Spacer />
              <p>{phone}</p>
            </div>
          </div>
          <div className='appt-field'>
            <div className='with-icon'>
              <CalendarIcon />
              <h2>Date</h2>
            </div>
            <div className='with-icon'>
              <Spacer />
              <p>{date}</p>
            </div>
          </div>
          <div className='appt-field'>
            <div className='with-icon'>
              <TimeIcon />
              <h2>Time</h2>
            </div>
            <div className='with-icon'>
              <Spacer />
              <p>{time}</p>
            </div>
          </div>
          <div className='appt-field'>
            <div className='with-icon'>
              <DocumentIcon />
              <h2>Test&#40;s&#41;</h2>
            </div>
            <div className='with-icon'>
              <Spacer />
              <p>
                <span className='test-span'>{testsSpan}</span>
              </p>
            </div>
          </div>
          <div className='appt-field'>
            <div className='with-icon'>
              <InfoIcon />
              <h2>Instructions</h2>
            </div>
            <div className='with-icon'>
              <Spacer />
              <p>
                Please arrive 5 minutes before your scheduled appointment time.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentItem;
