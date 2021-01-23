import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContextProvider from './Providers/FullContextProvider';
import { ScrollToTop } from './tools/scrolling.js';
import ErrorBoundary from './components/ErrorBoundary';
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
import ErrorHandler from './components/ErrorHandler';

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <ContextProvider>
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
                {/*  */}
                <Route path='/error' component={ErrorHandler} />
                <Route path='/skeleton' component={Skeleton} />
              </Switch>
            </div>
            <Navbar />
          </div>
        </ContextProvider>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
