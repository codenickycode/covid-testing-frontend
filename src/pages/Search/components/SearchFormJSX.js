import React from 'react';
import { TESTS } from '../../../constants.js';
import Test from './Test.js';

const SearchFormJSX = ({ toggleTest, zip, handleZipInput, submit, error }) => {
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
        autoFocus
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

export default SearchFormJSX;
