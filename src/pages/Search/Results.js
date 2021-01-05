import React, { useContext } from 'react';
import { GetDate, GetResults } from '../../ContextProvider.js';
import useSearchTools from './tools/useSearchTools.js';
import LocationPreview from './components/LocationPreview.js';

const SearchResults = ({ select }) => {
  const tools = useSearchTools();
  const date = useContext(GetDate);
  const locations = useContext(GetResults);

  const handleChangeDate = (type) => tools.changeDate(type);

  const handleSortBy = (type) => {
    tools.sortDistance();
    if (type === 'time') tools.sortTime();
  };

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
