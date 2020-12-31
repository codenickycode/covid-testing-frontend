import React, { useRef } from 'react';
import { TESTS } from '../constants.js';
import Test from './components/Test.js';

const SearchForm = ({ handleSubmit, error }) => {
  const zipRef = useRef('');

  const toggleTest = (e) => {
    e.stopPropagation();
    e.target.classList.toggle('select-active');
  };

  const submit = (e) => {
    e.preventDefault();
    const values = document.querySelectorAll('#form-home input');
    let tests = {};
    for (let i = 0; i < values.length - 1; i++) {
      tests[values[i].name] = values[i].checked;
    }
    handleSubmit(tests, zipRef.current);
  };

  return (
    <form id='form-home' className='form' onSubmit={submit}>
      {error && <h2 className='error'>There was error. Please try again</h2>}
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
        ref={zipRef}
        type='text'
        name='zip'
        placeholder='Enter your zipcode'
        maxLength='5'
        onChange={(e) => (zipRef.current = e.target.value)}
      ></input>
      <button type='submit' id='btn-search' className='btn' disabled={false}>
        Search availability
      </button>
    </form>
  );
};

export default SearchForm;
