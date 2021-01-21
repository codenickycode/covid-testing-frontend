import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContextProvider from './Providers/Context.js';
import { ScrollToTop } from './tools/scrolling.js';
import Alert from './components/Alert.js';
import Header from './sections/Header';
import Navbar from './sections/Navbar';
import Welcome from './pages/Welcome';
import Search from './pages/Search';
import Appointments from './pages/Appointments';
import Account from './pages/Account';
import Settings from './pages/Settings';
import Information from './pages/Information';
import Gateway from './pages/Gateway';

import Skeleton from './components/Skeletons.js';

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
