import React, { useState } from 'react';
import SearchFormJSX from './components/SearchFormJSX.js';

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
    <SearchFormJSX
      toggleTest={toggleTest}
      zip={zip}
      handleZipInput={handleZipInput}
      submit={submit}
      error={error}
    />
  );
};

export default SearchForm;
