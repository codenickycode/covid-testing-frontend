import React, { useContext, useEffect } from 'react';
import { AppContext, SearchContext } from '../ContextProvider.js';
import Location from './components/Location';

// const getLocations = async (zip) => {
//   setFetching(true);
//   try {
//     const res = await axios.get(
//       `http://localhost:8000/common/locations?zip=${zip}`
//     );
//     dispatch({ type: SET_ALL_LOCATIONS, payload: res.data });
//   } catch (e) {
//     console.log(e);
//     dispatch({ type: SET_ERROR, payload: e.message });
//   } finally {
//     setFetching(false);
//   }
// };

// const filterSearchLocations = useCallback(() => {
//   const searchLocations =
//     Object.keys(state.testFilter).length === 0
//       ? state.allLocations
//       : state.allLocations.filter((location) => {
//           for (let [test] of Object.entries(state.testFilter)) {
//             if (state.testFilter[test] && location.tests.indexOf(test) === -1)
//               return false;
//           }
//           return true;
//         });
//   dispatch({ type: SET_SEARCH_LOCATIONS, payload: searchLocations });
// }, [state.allLocations, state.testFilter]);

// const sortLocations = useCallback(() => {
//   const type = state.sortBy;
//   let updatedLocations = [...state.allLocations];
//   updatedLocations.sort((a, b) => a[type] - b[type]);
//   dispatch({ type: SET_SEARCH_LOCATIONS, payload: updatedLocations });
// }, [state.sortBy, state.allLocations]);

const SearchResults = () => {
  //   const { setTitle } = useContext(AppContext);
  //   const {
  //     zip,
  //     setZip,
  //     locations,
  //     filteredLocations,
  //     sortDistance,
  //     fetchingSort,
  //   } = useContext(SearchContext);
  //   useEffect(() => {
  //     setTitle('Next Available');
  //     sortDistance(locations);
  //   }, []);
  //   return fetchingSort ? (
  //     <h1>Loading...</h1>
  //   ) : (
  //     <div>
  //       <div className='center sort-tests'>
  //         <h2>Sort by:</h2>
  //         <button id='sort-time'>Time</button>
  //         <input
  //           type='text'
  //           name='zip'
  //           placeholder='Zip code'
  //           maxLength='5'
  //           value={zip}
  //           onChange={(e) => setZip(e.target.value)}
  //         ></input>
  //         <button
  //           id='sort-distance'
  //           className='btn'
  //           onClick={() => sortDistance(locations)}
  //         >
  //           Distance
  //         </button>
  //       </div>
  //       <div id='div-locations'>
  //         {filteredLocations.map((location, index) => {
  //           return <Location key={index} location={location} />;
  //         })}
  //       </div>
  //     </div>
  //   );
};

export default SearchResults;
