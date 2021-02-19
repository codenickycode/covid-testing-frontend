import React, { useState, useMemo } from 'react';
import { ReactComponent as ArrowIcon } from '../../icons/Arrow.svg';
import * as icons from '../../icons';
import { WithIcon } from '../../components';

export const AppointmentItem = ({ appointment }) => {
  const [expanded, setExpanded] = useState(false);

  const { tests } = appointment;
  const testsSpan = useMemo(() => formatTestsSpan(tests), [tests]);

  const handleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className='appt-item'>
      <div
        className={expanded ? 'appt-btn-up' : 'appt-btn'}
        onClick={handleExpand}
      >
        <ArrowIcon />
      </div>
      {!expanded ? (
        <AppointmentPreview
          handleExpand={handleExpand}
          appointment={appointment}
          testsSpan={testsSpan}
        />
      ) : (
        <AppointmentExpanded appointment={appointment} testsSpan={testsSpan} />
      )}
    </div>
  );
};

const AppointmentPreview = ({ handleExpand, appointment, testsSpan }) => {
  const {
    date,
    location: {
      address: { city },
    },
  } = appointment;
  return (
    <div className='preview' onClick={handleExpand}>
      <h2>{date}</h2>
      <p className='preview-info'>
        <span className='preview-info'>{testsSpan}</span> in {city}
      </p>
    </div>
  );
};

const AppointmentExpanded = ({ appointment, testsSpan }) => {
  const { date, time, location } = appointment;
  const { name, address, phone } = location;
  const { street, city, state, zip } = address;

  return (
    <div className='expanded'>
      <h2 className='expanded-header'>{name}</h2>
      <ApptField
        header='Address'
        text={`${street}, ${city}, ${state} ${zip}`}
        icon={icons.location}
      />
      <ApptField header='Phone' text={phone} icon={icons.phone} />
      <ApptField header='Date' text={date} icon={icons.calendar} />
      <ApptField header='Time' text={time} icon={icons.time} />
      <ApptField
        header={'Test(s)'}
        text={<span className='test-span'>{testsSpan}</span>}
        icon={icons.document}
      />
      <ApptField
        header='Instructions'
        text='Please arrive 5 minutes before your scheduled appointment time.'
        icon={icons.info}
      />
    </div>
  );
};

const ApptField = ({ icon, header, text }) => {
  return (
    <div className='appt-field'>
      <WithIcon icon={icon}>
        <h2>{header}</h2>
      </WithIcon>
      <WithIcon icon={icons.spacer}>
        <p>{text}</p>
      </WithIcon>
    </div>
  );
};

const formatTestsSpan = (tests) => {
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
  return testsSpan;
};
