import React from 'react';

const Confirmed = ({ result }) => {
  console.log(result);
  return (
    <>
      <h1>Confirmed!</h1>
      <p>{result}</p>
    </>
  );
};

export default Confirmed;
