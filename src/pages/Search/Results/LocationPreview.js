import React from 'react';
import { TESTS } from '../../../tools/constants.js';
import Image from '../../../components/Image.js';

const LocationPreview = ({ location, handleSelection }) => {
  const { name, phone, address, tests } = location;

  return (
    <div
      className='location-preview'
      onClick={() => handleSelection(location._id)}
    >
      <Image
        size='sml'
        classStyle='img-sml'
        src={`/img/locations/preview/${location._id.toString()}.jpg`}
        alt='Branch'
      />
      <div className='location-info'>
        <div className='location-basic'>
          <h4>{name}</h4>
          <p>{phone}</p>
          <p>{address.street}</p>
          <p>
            {address.city}, {address.state} {address.zip}
          </p>
        </div>
        <div className='location-tests'>
          <h4>Next Available Appointment:</h4>
          <p className='next-available'>{location.available[0]}</p>
          <h4>Tests available:</h4>
          <ul>
            {tests.map((test, index) => {
              return (
                <li key={index}>
                  <span>{TESTS[test].name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LocationPreview;
