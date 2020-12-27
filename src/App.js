import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SearchContext } from './ContextProvider.js';
import { TESTS } from './constants';
import Header from './pages/components/Header.js';
import Navbar from './pages/components/Navbar.js';
import Welcome from './pages/Welcome.js';
import Search from './pages/Search.js';
import Locations from './pages/Locations.js';

const App = () => {
  const { setTestFilter, getLocations, getAppointments } = useContext(
    SearchContext
  );
  // **************************************************** FIRST RENDER:
  // INITIALIZE TEST FILTER , GET ALL LOCATIONS, GET ALL APPOINTMENTS
  useEffect(() => {
    const filterInit = {};
    Object.entries(TESTS).forEach((type) => {
      filterInit[type[0]] = false;
    });
    setTestFilter(filterInit);
    getLocations();
    getAppointments();
  }, []);

  return (
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
  );
};

export default App;
