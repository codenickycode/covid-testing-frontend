import React from 'react';
import Location from './components/Location.js';

const SearchResults = ({ locations }) => {
  const sortBy = (type) => {};

  return (
    <div>
      <div className='center sort-tests'>
        <h2>Sort by:</h2>
        <button id='sort-time' className='btn' onClick={() => sortBy('time')}>
          Time
        </button>
        <button
          id='sort-distance'
          className='btn'
          onClick={() => sortBy('distance')}
        >
          Distance
        </button>
      </div>
      <div id='div-locations'>
        {locations.map((location, index) => {
          return <Location key={index} location={location} />;
        })}
      </div>
    </div>
  );
};

export default SearchResults;
