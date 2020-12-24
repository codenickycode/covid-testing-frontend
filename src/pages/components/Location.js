import React from 'react';

const Location = ({ location }) => {
  const { name, phone, address, tests } = location;
  return (
    <div className='location'>
      <div className='location-basic'>
        <h2>{name}</h2>
        <p>{phone}</p>
        <p>{address.street}</p>
        <p>
          {address.city}, {address.state} {address.zip}
        </p>
      </div>
      <div className='location-tests'>
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

export default Location;
