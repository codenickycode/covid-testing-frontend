import React, { useState } from 'react';
import { TESTS } from '../../constants.js';
import Test from './components/Test.js';
import Image from '../../components/Image.js';

const SearchForm = ({ handleSubmit }) => {
  const [zip, setZip] = useState('');
  const [tests, setTests] = useState([]);

  const selectTest = (e, type) => {
    let newTests = [...tests];
    const index = tests.indexOf(type);
    index === -1 ? newTests.push(type) : newTests.splice(index, 1);
    setTests(newTests);
  };

  const handleZipInput = (e) => {
    const val = e.target.value;
    if (val && val[val.length - 1].match(/\D/)) return;
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
    <div className='search-form-div'>
      <Image
        size='sml'
        style='img-sml'
        src='/img/welcome1.jpg'
        alt='Covid-19 test'
      />
      <form id='form-home' onSubmit={submit}>
        <h2>Choose the testing type</h2>
        <p>Which tests are you interested in?</p>
        <p>Select all that apply:</p>
        <div id='tests' className='test-items'>
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
        <h2>What's your location?</h2>
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
