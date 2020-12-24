import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './pages/components/Header.js';
import Navbar from './pages/components/Navbar.js';
import Home from './pages/Home.js';
import Locations from './pages/Locations.js';

const App = () => {
  const [title, setTitle] = useState('Covid-19 Tests');

  return (
    <Router>
      <div id='main'>
        <Header title={title} />
        <Switch>
          <Route exact path='/' render={() => <Home setTitle={setTitle} />} />
          <Route
            path='/locations'
            render={() => <Locations setTitle={setTitle} />}
          />
          {/* <Route path='/confirm' setTitle={setTitle} component={Confirm} />
          <Route path='/appointments' setTitle={setTitle} component={Appointments} />
          <Route path='/account' setTitle={setTitle} component={Account} /> */}
        </Switch>
        <Navbar />
      </div>
    </Router>
  );
};

export default App;
