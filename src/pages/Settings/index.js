import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Page, Header } from '../../components';
import { Preferences } from './Preferences';
import { LogoutButton } from './LogoutButton';
import { App } from '../../Providers/Context';

export default function Settings() {
  const { user } = useContext(App);

  return !user ? (
    <Redirect to='/gateway/settings' />
  ) : (
    <Page id='settings'>
      <Header header='Set your preferences' />
      <Preferences user={user} />
      <LogoutButton />
    </Page>
  );
}
