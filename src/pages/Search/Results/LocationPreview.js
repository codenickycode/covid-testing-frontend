import React from 'react';
import { TESTS } from '../../../tools/info/TESTS';
import Image from '../../../components/Image.js';
import { ReactComponent as ArrowIcon } from '../../../icons/Arrow.svg';

const LocationPreview = ({ location, handleSelection }) => {
  const { name, address, tests } = location;

  return (
    <div id='location-preview' onClick={() => handleSelection(location._id)}>
      {/* <Image
        size='sml'
        src={`/img/locations/preview/${location._id.toString()}.jpg`}
        alt='Branch'
      /> */}
      <div id='preview-info'>
        <div>
          <h2>{name}</h2>
          <hr />
          <p className='preview-address'>
            {address.street}, {address.city}, {address.state} {address.zip}
          </p>
        </div>
        {/* <div id='preview-tests'> */}
        <p className='preview-next'>Next:</p>
        <p id='preview-time' className='bold'>
          {location.available[0]}
        </p>
        {/* <p className='small bold'>Tests available:</p>
          <ul>
            {tests.map((test, index) => {
              return (
                <li key={index}>
                  <span className='small'>{TESTS[test].name}</span>
                </li>
              );
            })}
          </ul> */}
        {/* </div> */}
      </div>
      <ArrowIcon />
    </div>
  );
};

export default LocationPreview;
