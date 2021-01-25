import React, { useContext } from 'react';
import { App } from '../../Providers/Context.js';
import LocationPreview from './Results/LocationPreview.js';
import { ReactComponent as ArrowCircleIcon } from '../../icons/ArrowCircle.svg';
import { SearchResultsSkeleton } from '../../components/Skeletons.js';

const SearchResults = ({
  searchResults,
  date,
  handleSortBy,
  handleChangeDate,
  handleSelection,
}) => {
  const { loading } = useContext(App);
  return loading ? (
    <SearchResultsSkeleton />
  ) : (
    <div id='search-results'>
      <div className='date-picker'>
        <div className='icon deg180' onClick={() => handleChangeDate('dec')}>
          <ArrowCircleIcon />
        </div>
        <p>{date}</p>
        <div className='icon' onClick={() => handleChangeDate('inc')}>
          <ArrowCircleIcon />
        </div>
      </div>
      <div className='sort'>
        <div className='small bold'>Sort by:</div>
        <div className='smaller bold' onClick={() => handleSortBy('time')}>
          Time
        </div>
        <div className='smaller bold' onClick={() => handleSortBy('distance')}>
          Distance
        </div>
      </div>
      <div>
        {searchResults.map((location, index) => {
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
