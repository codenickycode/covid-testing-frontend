import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContextProvider from './Providers/ContextProvider.js';
import Header from './sections/Header.js';
import Navbar from './sections/Navbar.js';
import Welcome from './pages/Welcome.js';
import Search from './pages/Search.js';
import Appointments from './pages/Appointments.js';
import Account from './pages/Account.js';
import Settings from './pages/Settings.js';
import Information from './pages/Information.js';

const App = () => {
  return (
    <ContextProvider>
      <Router>
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
            </Switch>
          </div>
          <Navbar />
        </div>
      </Router>
    </ContextProvider>
  );
};

export default App;
