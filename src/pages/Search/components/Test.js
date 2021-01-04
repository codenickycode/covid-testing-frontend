import React from 'react';

const Test = ({ onClick, test }) => {
  const testType = test[0];
  const { name, info } = test[1];

  return (
    <label
      className='card-small'
      htmlFor={testType}
      id={`label-${testType}`}
      onClick={onClick}
    >
      <h4>{name}</h4>
      <p>{info}</p>
      <input
        type='checkbox'
        id={testType}
        className='checkbox'
        name={testType}
        value='true'
      ></input>
    </label>
  );
};

export default Test;
