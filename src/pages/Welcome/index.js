import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { App } from '../../Providers/Context.js';
import Image from '../../components/Image.js';
import { WelcomeSkeleton } from '../../components/Skeletons.js';

const Welcome = () => {
  const history = useHistory();
  const { loading } = useContext(App);

  return loading ? (
    <WelcomeSkeleton />
  ) : (
    <div id='welcome flex-col'>
      <h1>COVID-19 testing is avaialable at CityMD</h1>
      <p>We're here for you during this pandemic.</p>
      <Image src='/img/png/welcome.png' alt='Welcome illustration' size='lrg' />
      <h1>No more waiting!</h1>
      <p>Schedule an appointment in advance and skip the line.</p>
      <button
        autoFocus
        className='btn'
        onClick={() => history.push('/search/form')}
      >
        START
      </button>
    </div>
  );
};

export default Welcome;
