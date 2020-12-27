import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext, SearchContext } from '../ContextProvider.js';
import { TESTS } from '../constants';
import Test from './components/Test';

const Search = () => {
  const history = useHistory();
  const { zip, setZip, setTestFilter, setFetchingSort } = useContext(
    SearchContext
  );
  const { setTitle } = useContext(AppContext);

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
    setZip(values[values.length - 1].value);
    setTestFilter(tests);
    setFetchingSort(true);
    history.push(`/locations`);
  };

  useEffect(() => {
    setTitle('Search');
  }, []);

  return (
    <form id='form-home' className='form' onSubmit={submit}>
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
        onChange={(e) => setZip(e.target.value)}
      ></input>
      <button
        type='submit'
        id='btn-search'
        className='btn'
        disabled={zip.length < 5}
      >
        Search availability
      </button>
    </form>
  );
};

export default Search;
