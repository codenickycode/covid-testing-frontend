import React, { useContext } from 'react';
import { App } from '../../Providers/Context';
import { Go } from '../../Providers/Go';
import Image from '../../components/Image';
import { WelcomeSkeleton } from '../../components/Skeletons';
import { Button, Page } from '../../components/index';

const Welcome = () => {
  const { loading } = useContext(App);
  const go = useContext(Go);

  return loading ? (
    <WelcomeSkeleton />
  ) : (
    <Page id='welcome' addClass='flex-col'>
      <header className='center'>
        <h1>COVID-19 testing is available at CityMD</h1>
        <p>We're here for you during this pandemic.</p>
      </header>
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
      <Button
        autoFocus={true}
        onClick={() => go('/search/form')}
        label='START'
      />
    </Page>
  );
};

export default Welcome;
