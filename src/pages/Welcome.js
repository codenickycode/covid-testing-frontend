import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { App } from '../Providers/Context.js';
import Image from '../components/Image.js';
import { WelcomeSkeleton } from '../components/Skeletons.js';

const Welcome = () => {
  const history = useHistory();
  const { loading } = useContext(App);

  return loading ? (
    <WelcomeSkeleton />
  ) : (
    <div className='welcome-div'>
      <Image
        classStyle='img-sml'
        src='/img/welcome1.jpg'
        alt='Illustration'
        size='sml'
      />
      <h1>Hello</h1>
      <p>City MD is here to make your life easier during the pandemic.</p>
      <Image
        classStyle='img-med '
        src='/img/welcome2.jpg'
        alt='Illustration'
        size='med'
      />
      <h1>No more waiting!</h1>
      <p>In four simple steps, you can book a COVID-19 testing appointment.</p>
      <button
        autoFocus
        className='btn'
        onClick={() => history.push('/search/form')}
      >
        LET'S START
      </button>
    </div>
  );
};

export default Welcome;
