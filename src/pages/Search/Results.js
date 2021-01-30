import React, { useState, useContext } from 'react';
import { App } from '../../Providers/Context.js';
import LocationPreview from './Results/LocationPreview.js';
import { ReactComponent as ArrowIcon } from '../../icons/Arrow.svg';
import { SearchResultsSkeleton } from '../../components/Skeletons.js';

const SearchResults = ({
  searchResults,
  date,
  handleSortBy,
  handleChangeDate,
  handleSelection,
}) => {
  const { loading } = useContext(App);
  const [sortBySelected, setSortBySelected] = useState('time');

  const sortBy = (type) => {
    setSortBySelected(type);
    handleSortBy(type);
  };

  return loading ? (
    <SearchResultsSkeleton />
  ) : (
    <div id='search-results' className='page transition show'>
      <div className='date-picker'>
        <ArrowIcon
          className='icon deg180'
          onClick={() => handleChangeDate('dec')}
        />
        <p className='date'>{date}</p>
        <ArrowIcon className='icon' onClick={() => handleChangeDate('inc')} />
      </div>
      <div className='sort'>
        <p className='bold'>Sort by:</p>
        <p
          className={
            sortBySelected === 'time'
              ? 'small sort-by selected'
              : 'small sort-by'
          }
          onClick={() => sortBy('time')}
        >
          Time
        </p>
        <p
          className={
            sortBySelected === 'distance'
              ? 'small sort-by selected'
              : 'small sort-by'
          }
          onClick={() => sortBy('distance')}
        >
          Distance
        </p>
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
