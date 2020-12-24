import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Location from './components/Location';
const axios = require('axios').default;

const Locations = ({ setTitle }) => {
  const history = useHistory();
  const { zip, tests } = history.location.state;
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  const filter = () => {
    setFilteredLocations(
      locations.filter((location) => {
        for (let test of tests) {
          if (location.tests.indexOf(test) === -1) return false;
        }
        return true;
      })
    );
  };

  const sort = () => {};

  // first render : get all locations
  useEffect(() => {
    setTitle('Locations');
    axios
      .get(`http://localhost:8000/common/locations?zip=${zip}`)
      .then((res) => setLocations(res.data))
      .catch((e) => console.log(e));
  }, []);

  // after setLocations
  useEffect(() => {
    filter();
  }, [locations]);

  // after setFilteredLocations
  useEffect(() => {
    sort();
  }, [filteredLocations]);

  return (
    <>
      <div className='center select-tests'>
        <button id='filter-rapid'>Rapid</button>
        <button id='filter-pcr'>PCR</button>
        <button id='filter-blood'>Blood</button>
      </div>
      <div className='center sort-tests'>
        <h2>Sort by:</h2>
        <button id='sort-time'>Time</button>
        <button id='sort-distance'>Distance</button>
      </div>
      <div id='div-locations'>
        {filteredLocations.map((location, index) => {
          return <Location key={index} location={location} />;
        })}
      </div>
    </>
  );
};

export default Locations;
