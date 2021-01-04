import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ContextProvider } from './ContextProvider.js';
import Header from './components/Header.js';
import Navbar from './components/Navbar.js';
const pages = require('./pages.js');

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <div id='main'>
          <Header />
          <Switch>
            <Route exact path='/' component={pages.Welcome} />
            <Route path='/search' component={pages.Search} />
            <Route path='/selection' component={pages.Selection} />
            <Route path='/appointments' component={pages.Appointments} />
            <Route path='./account' component={pages.Account} />
            <Route path='./about' component={pages.About} />
            <Route path='./settings' component={pages.Settings} />
          </Switch>
          <Navbar />
        </div>
      </Router>
    </ContextProvider>
  );
};

export default App;
