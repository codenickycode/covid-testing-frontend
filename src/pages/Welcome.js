import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { App, SetApp } from '../Providers/ContextProvider.js';

const Welcome = () => {
  const { title } = useContext(App);
  const setApp = useContext(SetApp);
  if (title !== 'Welcome')
    setApp((prevState) => ({ ...prevState, title: 'Welcome' }));

  const history = useHistory();

  return (
    <div className='welcome-div'>
      <img className='img-sml' src='/img/welcome1.jpg' alt='Illustration' />
      <h1>HELLO!</h1>
      <p>City MD is here to make your life easier during the pandemic.</p>
      <img className='img-med ' src='/img/welcome2.jpg' alt='Illustration' />
      <h1>NO MORE WAIT!</h1>
      <p>In four simple steps, you can book a COVID-19 testing appointment.</p>
      <button autoFocus className='btn' onClick={() => history.push('/search')}>
        LET'S START
      </button>
    </div>
  );
};

export default Welcome;
