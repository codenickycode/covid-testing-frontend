import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContextProvider from './ContextProvider.js';
import Header from './components/Header.js';
import Navbar from './components/Navbar.js';
import Welcome from './pages/Welcome.js';
import Search from './pages/Search.js';
// import Selection from './pages/Selection.js';
// import Appointments from './pages/Appointments.js';
// import Account from './pages/Account.js';
// import About from './pages/About.js';
// import Settings from './pages/Settings.js';

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <div id='main'>
          <Header />
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route path='/search' component={Search} />
            {/* <Route path='/selection' component={Selection} />
            <Route path='/appointments' component={Appointments} />
            <Route path='./account' component={Account} />
            <Route path='./about' component={About} />
            <Route path='./settings' component={Settings} /> */}
          </Switch>
          <Navbar />
        </div>
      </Router>
    </ContextProvider>
  );
};

export default App;
