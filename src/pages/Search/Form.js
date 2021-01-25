import React, { useState } from 'react';
import { TESTS } from '../../tools/info/TESTS';
import Test from './Form/Test.js';
import tools from '../../tools';

const SearchForm = ({ handleSubmit }) => {
  const [zip, setZip] = useState('');
  const [tests, setTests] = useState([]);

  const selectTest = (e, type) => {
    console.log(e.target);
    let newTests = [...tests];
    const index = tests.indexOf(type);
    index === -1 ? newTests.push(type) : newTests.splice(index, 1);
    setTests(newTests);
  };

  const handleZipInput = (e) => {
    const val = e.target.value;
    if (!tools.validNum(val)) return;
    setZip(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    let testsFilter = {};
    for (let key of Object.keys(TESTS)) {
      testsFilter[key] = tests.includes(key);
    }
    handleSubmit(testsFilter, zip);
  };

  return (
    <div id='search-form'>
      <form id='form-home' onSubmit={submit}>
        <h1 id='choose'>Choose the test type</h1>
        <p>We will only show locations meeting your requirements.</p>
        <div className='items flex-col'>
          {Object.entries(TESTS).map((test, index) => {
            return (
              <Test
                key={index}
                selectedTests={tests}
                selectTest={selectTest}
                test={test}
              />
            );
          })}
        </div>
        <h1 id='zip'>What's your location?</h1>
        <p>Enter your zipcode to find a CityMD nearby</p>
        <input
          autoFocus
          type='text'
          name='zip'
          placeholder='Enter your zipcode'
          maxLength='5'
          value={zip}
          onChange={(e) => handleZipInput(e)}
        ></input>
        <button type='submit' className='btn' disabled={zip < 5}>
          Search availability
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
