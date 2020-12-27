import React, { useContext, useEffect } from 'react';
import { AppContext, SearchContext } from '../ContextProvider.js';
import Location from './components/Location';

const Locations = () => {
  const { setTitle } = useContext(AppContext);

  const {
    zip,
    setZip,
    locations,
    filteredLocations,
    sortDistance,
    fetchingSort,
  } = useContext(SearchContext);

  useEffect(() => {
    setTitle('Next Available');
    sortDistance(locations);
  }, []);

  return fetchingSort ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <div className='center sort-tests'>
        <h2>Sort by:</h2>
        <button id='sort-time'>Time</button>
        <input
          type='text'
          name='zip'
          placeholder='Zip code'
          maxLength='5'
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        ></input>
        <button
          id='sort-distance'
          className='btn'
          onClick={() => sortDistance(locations)}
        >
          Distance
        </button>
      </div>
      <div id='div-locations'>
        {filteredLocations.map((location, index) => {
          return <Location key={index} location={location} />;
        })}
      </div>
    </div>
  );
};

export default Locations;
