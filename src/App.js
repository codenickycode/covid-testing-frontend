import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContextProvider from './Providers/ContextProvider.js';
import ScrollToTop from './tools/ScrollToTop.js';
import Alert from './components/Alert.js';
import Header from './sections/Header.js';
import Navbar from './sections/Navbar.js';
import Welcome from './pages/Welcome.js';
import Search from './pages/Search.js';
import Appointments from './pages/Appointments.js';
import Account from './pages/Account.js';
import Settings from './pages/Settings.js';
import Information from './pages/Information.js';
import Gateway from './pages/Gateway.js';

import Skeleton from './pages/Skeletons.js';

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <ScrollToTop />
        <Alert />
        <div id='main'>
          <Header />
          <div id='pages'>
            <Switch>
              <Route exact path='/' component={Welcome} />
              <Route path='/search' component={Search} />
              <Route path='/appointments' component={Appointments} />
              <Route path='/account' component={Account} />
              <Route path='/settings' component={Settings} />
              <Route path='/information' component={Information} />
              <Route path='/gateway/:to' component={Gateway} />
              <Route path='/skeleton' component={Skeleton} />
            </Switch>
          </div>
          <Navbar />
        </div>
      </Router>
    </ContextProvider>
  );
};

export default App;
