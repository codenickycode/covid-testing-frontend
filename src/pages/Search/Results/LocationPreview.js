import React from 'react';
import { TESTS } from '../../../tools/info/TESTS';
import Image from '../../../components/Image.js';

const LocationPreview = ({ location, handleSelection }) => {
  const { name, address, tests } = location;

  return (
    <div id='location-preview' onClick={() => handleSelection(location._id)}>
      <Image
        size='sml'
        src={`/img/locations/preview/${location._id.toString()}.jpg`}
        alt='Branch'
      />
      <div id='preview-info'>
        <div>
          <h2>{name}</h2>
          <p className='small'>
            {address.street}, {address.city}, {address.state} {address.zip}
          </p>
          <hr />
        </div>
        <div id='preview-tests'>
          <p className='small bold'>Next available appointment:</p>
          <p id='preview-time' className='bold'>
            {location.available[0]}
          </p>
          <p className='small bold'>Tests available:</p>
          <ul>
            {tests.map((test, index) => {
              return (
                <li key={index}>
                  <span className='small'>{TESTS[test].name}</span>
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
