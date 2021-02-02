import React from 'react';
import { ReactComponent as LocationIcon } from '../../icons/Location.svg';
import { ReactComponent as PhoneIcon } from '../../icons/Call.svg';
import { ReactComponent as CalendarIcon } from '../../icons/Calendar.svg';
import { ReactComponent as TimeIcon } from '../../icons/TimeCircle.svg';
import { ReactComponent as DocumentIcon } from '../../icons/Document.svg';
import { ReactComponent as InfoIcon } from '../../icons/InfoSquare.svg';
import { ReactComponent as Spacer } from '../../icons/Spacer.svg';

export const AppointmentExpanded = ({ fullRef, appointment, testsSpan }) => {
  const { date, time, location } = appointment;
  const { name, address, phone } = location;
  const { street, city, state, zip } = address;

  return (
    <div className='expanded' ref={fullRef}>
      <h1>{name}</h1>
      <ApptField header='Address' text={`${street}, ${city}, ${state} ${zip}`}>
        <LocationIcon />
      </ApptField>
      <ApptField header='Phone' text={phone}>
        <PhoneIcon />
      </ApptField>
      <ApptField header='Date' text={date}>
        <CalendarIcon />
      </ApptField>
      <ApptField header='Time' text={time}>
        <TimeIcon />
      </ApptField>
      <ApptField
        header={'Test(s)'}
        text={<span className='test-span'>{testsSpan}</span>}
      >
        <DocumentIcon />
      </ApptField>
      <ApptField
        header='Instructions'
        text='Please arrive 5 minutes before your scheduled appointment time.'
      >
        <InfoIcon />
      </ApptField>
    </div>
  );
};

const ApptField = ({ children, header, text }) => {
  return (
    <div className='appt-field'>
      <div className='with-icon'>
        {children}
        <h2>{header}</h2>
      </div>
      <div className='with-icon'>
        <Spacer />
        <p>{text}</p>
      </div>
    </div>
  );
};
