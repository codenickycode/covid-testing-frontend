import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  LoggedInProvider,
  UpdateAccountHeaderProvider,
  NameProvider,
  AddressProvider,
  PhoneProvider,
  DobProvider,
  EmailProvider,
  PasswordProvider,
  InsuranceProvider,
  EmergencyContactProvider,
  TravelProvider,
} from './Providers/providers.js';
import Header from './components/Header.js';
import Navbar from './components/Navbar.js';
import Welcome from './pages/Welcome.js';
import Search from './pages/Search.js';
import Appointments from './pages/Appointments.js';
import Account from './pages/Account.js';
// import About from './pages/About.js';
// import Settings from './pages/Settings.js';

const App = () => {
  return (
    <LoggedInProvider>
      <UpdateAccountHeaderProvider>
        <NameProvider>
          <AddressProvider>
            <PhoneProvider>
              <DobProvider>
                <EmailProvider>
                  <PasswordProvider>
                    <InsuranceProvider>
                      <EmergencyContactProvider>
                        <TravelProvider>
                          <Router>
                            <div id='main'>
                              <Header />
                              <Switch>
                                <Route exact path='/' component={Welcome} />
                                <Route path='/search' component={Search} />
                                <Route
                                  path='/appointments'
                                  component={Appointments}
                                />
                                <Route path='/account' component={Account} />
                                {/* <Route path='./about' component={About} />
            <Route path='./settings' component={Settings} /> */}
                              </Switch>
                              <Navbar />
                            </div>
                          </Router>
                        </TravelProvider>
                      </EmergencyContactProvider>
                    </InsuranceProvider>
                  </PasswordProvider>
                </EmailProvider>
              </DobProvider>
            </PhoneProvider>
          </AddressProvider>
        </NameProvider>
      </UpdateAccountHeaderProvider>
    </LoggedInProvider>
  );
};

export default App;
