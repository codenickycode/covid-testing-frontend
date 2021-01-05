import React from 'react';
import { useHistory } from 'react-router-dom';
import useSearchTools from '../tools/useSearchTools.js';

const LocationPreview = ({ location }) => {
  const history = useHistory();
  const tools = useSearchTools();

  const { name, phone, address, tests } = location;

  const handleSelection = (selected) => {
    tools.storeSelection(selected);
    history.push('/selection');
  };

  return (
    <div className='location' onClick={() => handleSelection(location._id)}>
      <div className='location-basic'>
        <h2>{name}</h2>
        <p>{phone}</p>
        <p>{address.street}</p>
        <p>
          {address.city}, {address.state} {address.zip}
        </p>
      </div>
      <div className='location-tests'>
        <h4>Next Available Appointment:</h4>
        <h6>{location.available[0]}</h6>
        <h4>Tests available:</h4>
        <ul>
          {tests.map((test, index) => {
            return <li key={index}>{test}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default LocationPreview;
