import React from 'react';
import Location from './components/Location';

const sortDistance = () => {};
const sortTime = () => {};

const Locations = ({ locations }) => {
  <div>
    <div className='center sort-tests'>
      <h2>Sort by:</h2>
      <button id='sort-time' className='btn' onClick={sortTime}>
        Time
      </button>
      <button id='sort-distance' className='btn' onClick={sortDistance}>
        Distance
      </button>
    </div>
    <div id='div-locations'>
      {locations.map((location, index) => {
        return <Location key={index} location={location} />;
      })}
    </div>
  </div>;
};

export default Locations;
