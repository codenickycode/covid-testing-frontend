import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TESTS } from '../constants';
import Test from './components/Test';

const Home = ({ setTitle, search, setSearch }) => {
  let zip = search.zip.slice();
  let tests = { ...search.tests };
  useEffect(() => setTitle('Covid-19 tests'));
  const history = useHistory();

  const toggleTest = (e) => {
    e.stopPropagation();
    e.target.classList.toggle('select-active');
  };

  const submit = (e) => {
    e.preventDefault();
    const values = document.querySelectorAll('#form-home input');
    tests = {};
    for (let i = 0; i < values.length - 1; i++) {
      tests[values[i].name] = values[i].checked;
    }
    zip = values[values.length - 1].value;
    setSearch({ zip, tests });
    history.push(`/locations`);
  };

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
      ></input>
      <button type='submit' id='btn-search' className='btn'>
        Search availability
      </button>
    </form>
  );
};

export default Home;
