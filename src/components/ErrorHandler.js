import React from 'react';

export default function ErrorHandler() {
  const errors = [];
  for (let [k, v] of Object.entries(localStorage)) {
    errors.push([k, v]);
  }

  function clearStorage() {
    localStorage.clear();
    sessionStorage.clear();
  }

  function reload() {
    window.location.href = '/';
  }

  return (
    <>
      <button onClick={clearStorage}>Clear Storage</button>
      <button onClick={reload}>Reload</button>

      {errors.map((error, i) => (
        <>
          <h1>{error[0]}</h1>
          <p>{error[1]}</p>
        </>
      ))}
    </>
  );
}
