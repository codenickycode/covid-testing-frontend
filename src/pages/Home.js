import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TESTS } from '../constants';
import Test from './components/Test';

const Home = ({ setTitle }) => {
  useEffect(() => setTitle('Covid-19 tests'));
  const history = useHistory();

  const toggleTest = (e) => {
    e.stopPropagation();
    e.target.classList.toggle('select-active');
  };

  const submit = (e) => {
    e.preventDefault();
    const values = document.querySelectorAll('#form-home input');
    const tests = [];
    for (let i = 0; i < 3; i++) {
      if (values[i].checked) tests.push(values[i].name);
    }
    const zip = values[3].value;
    history.push({
      pathname: '/locations',
      state: { zip, tests },
    });
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
