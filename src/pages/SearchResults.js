import React from 'react';
import LocationPreview from './components/LocationPreview.js';

const SearchResults = ({ locations, sortBy, date, changeDate, select }) => {
  return (
    <div>
      <div className='center date-picker'>
        <button
          id='date-dec'
          className='btn-small'
          onClick={() => changeDate('dec')}
        >
          {'<'}
        </button>
        <p id='date'>{date}</p>
        <button
          id='date-inc'
          className='btn-small'
          onClick={() => changeDate('inc')}
        >
          {'>'}
        </button>
      </div>
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
          return (
            <LocationPreview key={index} location={location} select={select} />
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
