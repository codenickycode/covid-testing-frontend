import React, { useState, useContext } from 'react';
import { App } from '../../Providers/Context.js';
import LocationPreview from './Results/LocationPreview.js';
import { SearchResultsSkeleton } from '../../components/Skeletons.js';
import { DatePicker, Page } from '../../components/index.js';

export default function SearchResults({
  searchResults,
  date,
  handleSortBy,
  handleChangeDate,
  handleSelection,
}) {
  const { loading } = useContext(App);
  const [sortBySelected, setSortBySelected] = useState('time');

  const sortBy = (type) => {
    setSortBySelected(type);
    handleSortBy(type);
  };

  return loading ? (
    <SearchResultsSkeleton />
  ) : (
    <Page id='search-results'>
      <DatePicker handleChangeDate={handleChangeDate} date={date} />
      <Sort sortBySelected={sortBySelected} sortBy={sortBy} />
      <Results
        searchResults={searchResults}
        handleSelection={handleSelection}
      />
    </Page>
  );
}

const Sort = ({ sortBySelected, sortBy }) => {
  const sortClass = 'small sort-by ';
  return (
    <div className='sort'>
      <p className='bold'>Sort by:</p>
      <p
        className={sortClass + sortBySelected === 'time' ? 'selected' : ''}
        onClick={() => sortBy('time')}
      >
        Time
      </p>
      <p
        className={sortClass + sortBySelected === 'distance' ? 'selected' : ''}
        onClick={() => sortBy('distance')}
      >
        Distance
      </p>
    </div>
  );
};

const Results = ({ searchResults, handleSelection }) => {
  return (
    <div>
      {searchResults.map((location) => {
        return (
          <LocationPreview
            key={location._id}
            location={location}
            handleSelection={handleSelection}
          />
        );
      })}
    </div>
  );
};
