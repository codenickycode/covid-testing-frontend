import React, { useState } from 'react';
import { TESTS } from '../../tools/info/TESTS';
import Test from './Form/Test.js';
import tools from '../../tools';
import { ReactComponent as DocumentIcon } from '../../icons/Document.svg';
import { ReactComponent as LocationIcon } from '../../icons/Location.svg';
import { ReactComponent as Spacer } from '../../icons/Spacer.svg';

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

  const handleZipInput = ({ target: { value } }) => {
    if (!tools.validNum(value)) return;
    setZip(value);
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
      <form id='form-home' className='flex-col' onSubmit={submit}>
        <div className='title'>
          <div className='with-spacer'>
            <DocumentIcon />
            <h1>Choose the test type</h1>
          </div>
          <div className='with-spacer'>
            <Spacer />
            <p>We will only show locations matching your requirements.</p>
          </div>
        </div>
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
        <div className='title'>
          <div className='with-spacer'>
            <LocationIcon />
            <h1>What's your location?</h1>
          </div>
        </div>
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