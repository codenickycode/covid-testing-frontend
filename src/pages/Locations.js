import React, { useEffect, useState } from 'react';
import Location from './components/Location';
const axios = require('axios').default;

const Locations = ({ setTitle }) => {
  const [zip, setZip] = useState('');
  const [tests, setTests] = useState({ rapid: true, pcr: true, blood: true });
  const [prevSort, setPrevSort] = useState({});
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  const toggleTest = (e, test) => {
    e.target.classList.toggle('select-active');
    setTests({ ...tests, [test]: !tests[test] });
  };

  const filter = () => {
    if (Object.keys(tests).length === 0) return setFilteredLocations(locations);
    setFilteredLocations(
      locations.filter((location) => {
        for (let [test, val] of Object.entries(tests)) {
          if (tests[test] && location.tests.indexOf(test) === -1) return false;
        }
        return true;
      })
    );
    console.log(tests);
  };

  const sortDistance = ([...array]) => {
    if (!zip || zip.match(/\D/g)) return;
    if (zip in prevSort) return setLocations(prevSort[zip]);
    let locationZips = '';
    for (let location of array) {
      locationZips += location.address.zip + '|';
    }
    axios
      .post(`http://localhost:8000/common/locations/distance`, {
        zip,
        locationZips,
        locations: array,
      })
      .then((res) => {
        res.data.sort((a, b) => a.distance - b.distance);
        setPrevSort({ ...prevSort, [zip]: res.data });
        setLocations(res.data);
      })
      .catch((e) => console.log(e));
  };

  // first render : get all locations
  useEffect(() => {
    setTitle('Locations');
    axios
      .get('http://localhost:8000/common/locations')
      .then((res) => {
        if (!zip) setLocations(res.data);
        sortDistance(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  // after setLocations, toggleTest
  useEffect(() => {
    filter();
  }, [locations, tests]);

  return (
    <>
      <div className='center select-tests'>
        <button id='filter-rapid' onClick={(e) => toggleTest(e, 'rapid')}>
          Rapid
        </button>
        <button id='filter-pcr' onClick={(e) => toggleTest(e, 'pcr')}>
          PCR
        </button>
        <button id='filter-blood' onClick={(e) => toggleTest(e, 'blood')}>
          Blood
        </button>
      </div>
      <div className='center sort-tests'>
        <h2>Sort by:</h2>
        <button id='sort-time'>Time</button>
        <input
          type='text'
          name='zip'
          placeholder='Zipcode'
          maxLength='5'
          defaultValue={zip}
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
    </>
  );
};

export default Locations;
