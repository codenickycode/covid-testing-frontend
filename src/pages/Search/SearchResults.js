import React, { useContext } from 'react';
import { App } from '../../Providers/ContextProvider.js';
import LocationPreview from './components/LocationPreview.js';
import { ReactComponent as Arrow } from '../../icons/arrow.svg';
import { SearchResultsSkeleton } from '../Skeletons.js';

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
    <div className='search-results-div'>
      <div className='date-picker'>
        <div className='icon' onClick={() => handleChangeDate('dec')}>
          <Arrow />
        </div>
        <p>{date}</p>
        <div className='icon deg180' onClick={() => handleChangeDate('inc')}>
          <Arrow />
        </div>
      </div>
      <div className='sort-tests'>
        <div className='select-label'>Sort by:</div>
        <div className='select-small' onClick={() => handleSortBy('time')}>
          Time
        </div>
        <div className='select-small' onClick={() => handleSortBy('distance')}>
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
