import React from 'react';
import { useHistory } from 'react-router-dom';

const Welcome = () => {
  const history = useHistory();

  return (
    <div id='welcome-div'>
      <h1>HELLO!</h1>
      <p>City MD is here to make your life easier during the pandemic.</p>
      <img src='' alt='Illustration' />
      <h2>NO MORE WAIT!</h2>
      <p>In four simple steps, you can book a COVID-19 testing appointment.</p>
      <button
        autoFocus
        id='btn-start'
        className='btn'
        onClick={() => history.push('/search')}
      >
        LET'S START
      </button>
    </div>
  );
};

export default Welcome;
