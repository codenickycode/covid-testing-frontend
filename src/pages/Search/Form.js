import React, { useState } from 'react';
import { TESTS } from './tools/constants.js';
import Test from './components/Test.js';

const SearchForm = ({ handleSubmit, error }) => {
  const [zip, setZip] = useState('');

  const toggleTest = (e) => {
    e.stopPropagation();
    e.target.classList.toggle('select-active');
  };

  const handleZipInput = (e) => {
    const val = e.target.value;
    if (val && val[val.length - 1].match(/\D/)) return;
    setZip(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    const values = document.querySelectorAll('#form-home input');
    let tests = {};
    for (let i = 0; i < values.length - 1; i++) {
      tests[values[i].name] = values[i].checked;
    }
    handleSubmit(tests, zip);
  };

  return (
    <form id='form-home' className='form' onSubmit={submit}>
      {error && <h2 className='error'>{error}</h2>}
      <h1>Hi!</h1>
      <p>Please select which tests you are interested in...</p>
      <div id='tests' className=''>
        {Object.entries(TESTS).map((test, index) => {
          return (
            <Test key={index} onClick={(e) => toggleTest(e)} test={test} />
          );
        })}
      </div>
      <h2>Where?</h2>
      <p>Select your search location...</p>
      <input
        type='text'
        name='zip'
        placeholder='Enter your zipcode'
        maxLength='5'
        value={zip}
        onChange={(e) => handleZipInput(e)}
      ></input>
      <button type='submit' id='btn-search' className='btn' disabled={zip < 5}>
        Search availability
      </button>
    </form>
  );
};

export default SearchForm;
