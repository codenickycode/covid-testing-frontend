import React from 'react';

const Failed = ({ result }) => {
  console.log(result);
  return (
    <>
      <h1>Failed!</h1>
      <p>{result}</p>
    </>
  );
};

export default Failed;
