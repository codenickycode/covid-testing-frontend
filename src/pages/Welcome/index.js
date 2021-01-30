import React, { useContext } from 'react';
import { App, Go } from '../../Providers/Context.js';
import Image from '../../components/Image.js';
import { WelcomeSkeleton } from '../../components/Skeletons.js';

const Welcome = () => {
  const { loading } = useContext(App);
  const go = useContext(Go);

  return loading ? (
    <WelcomeSkeleton />
  ) : (
    <div id='welcome' className='page transition show flex-col'>
      <div className='center'>
        <h1>COVID-19 testing is available at CityMD</h1>
        <p>We're here for you during this pandemic.</p>
      </div>
      <Image
        id='welcome-img'
        src='/img/png/welcome.png'
        alt='Welcome illustration'
        size='lrg'
      />
      <div className='center'>
        <h1>No more waiting!</h1>
        <p>Schedule an appointment in advance and skip the line.</p>
      </div>
      <button autoFocus className='btn' onClick={() => go('/search/form')}>
        START
      </button>
    </div>
  );
};

export default Welcome;
