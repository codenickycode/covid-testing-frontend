import React from 'react';
import LocationPreview from './components/LocationPreview.js';

const SearchResults = ({
  date,
  results,
  handleChangeDate,
  handleSortBy,
  handleSelection,
}) => {
  return (
    <div>
      <div className='center date-picker'>
        <button
          id='date-dec'
          className='btn-small'
          onClick={() => handleChangeDate('dec')}
        >
          {'<'}
        </button>
        <p id='date'>{date}</p>
        <button
          id='date-inc'
          className='btn-small'
          onClick={() => handleChangeDate('inc')}
        >
          {'>'}
        </button>
      </div>
      <div className='center sort-tests'>
        <h2>Sort by:</h2>
        <button
          id='sort-time'
          className='btn'
          onClick={() => handleSortBy('time')}
        >
          Time
        </button>
        <button
          id='sort-distance'
          className='btn'
          onClick={() => handleSortBy('distance')}
        >
          Distance
        </button>
      </div>
      <div id='div-locations'>
        {results.map((location, index) => {
          return (
            <LocationPreview
              key={index}
              location={location}
              handleSelection={handleSelection}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
