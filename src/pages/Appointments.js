import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as tools from '../tools/tools.js';
import { App } from '../Providers/ContextProvider.js';
import { Appointments } from '../Providers/AccountProvider.js';
import AppointmentsList from './Appointments/AppointmentsList.js';
import LoginModal from './Modal/LoginModal.js';

const Error = ({ error }) => <h1>{error}</h1>;
const Loading = () => <h1>Loading...</h1>;

const AppointmentsPage = () => {
  const history = useHistory();
  const { loading, error, loggedIn } = useContext(App);
  const appointments = useContext(Appointments);

  const [showPast, setShowPast] = useState(false);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    if (!loggedIn) return;
    let updated = [...appointments];
    updated.forEach((appointment) => (appointment.expanded = false));
    const sorted = tools.sortAppointments(updated);
    setUpcoming(sorted[0]);
    setPast(sorted[1]);
  }, [loggedIn, appointments]);

  return (
    <>
      {loading && <Loading />}
      {error && <Error error={error} />}
      {!loggedIn ? (
        <LoginModal closeModal={history.goBack} />
      ) : (
        <div id='appointments-div'>
          <div className='appointments-tabs'>
            <div id='upcoming' onClick={() => setShowPast(false)}>
              Upcoming
            </div>
            <div id='past' onClick={() => setShowPast(true)}>
              Past
            </div>
          </div>
          {showPast ? (
            past.length === 0 ? (
              <h1>No past appointments.</h1>
            ) : (
              <AppointmentsList appointments={past} setAppointments={setPast} />
            )
          ) : upcoming.length === 0 ? (
            <h1>No upcoming appointments.</h1>
          ) : (
            <AppointmentsList
              appointments={upcoming}
              setAppointments={setUpcoming}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AppointmentsPage;
