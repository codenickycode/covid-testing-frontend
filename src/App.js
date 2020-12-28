import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ContextProvider } from './ContextProvider.js';
import Header from './pages/components/Header.js';
import Navbar from './pages/components/Navbar.js';
import Welcome from './pages/Welcome.js';
import Search from './pages/Search.js';
import Locations from './pages/Locations.js';

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <div id='main'>
          <Header />
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route path='/search' component={Search} />
            <Route path='/locations' component={Locations} />
            {/* <Route path='/confirm' setTitle={setTitle} component={Confirm} /> */}
            {/* <Route path='/appointments' setTitle={setTitle} component={Appointments} /> */}
            {/* <Route path='/account' setTitle={setTitle} component={Account} /> */}
          </Switch>
          <Navbar />
        </div>
      </Router>
    </ContextProvider>
  );
};

export default App;
