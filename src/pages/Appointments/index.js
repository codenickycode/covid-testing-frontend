import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import tools from '../../tools/index.js';
import { App, SetApp } from '../../Providers/Context.js';
import AppointmentsList from './List.js';
import { AppointmentsSkeleton } from '../../components/Skeletons.js';

const AppointmentsPage = () => {
  const { user } = useContext(App);
  const setApp = useContext(SetApp);

  const [loading, setLoading] = useState(true);
  const [showPast, setShowPast] = useState(false);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    const appointments = user?.appointments || [];
    setLoading(true);
    let updated = [...appointments];
    updated.forEach((appointment) => (appointment.expanded = false));
    const sorted = tools.sortAppointments(updated);
    setUpcoming(sorted[0]);
    setPast(sorted[1]);
    setLoading(false);
  }, [user, setApp]);

  return !user ? (
    <Redirect to='/gateway/appointments' />
  ) : (
    <div id='appointments' className='page transition show'>
      <div className='tabs'>
        <h2
          className={showPast ? 'tab' : 'tab-selected'}
          onClick={() => setShowPast(false)}
        >
          Upcoming
        </h2>
        <h2
          className={showPast ? 'tab-selected' : 'tab'}
          onClick={() => setShowPast(true)}
        >
          Past
        </h2>
      </div>
      {loading ? (
        <AppointmentsSkeleton />
      ) : showPast ? (
        past.length === 0 ? (
          <h1 className='m-top-2'>No past appointments.</h1>
        ) : (
          <AppointmentsList appointments={past} setAppointments={setPast} />
        )
      ) : upcoming.length === 0 ? (
        <h1 className='m-top-2'>No upcoming appointments.</h1>
      ) : (
        <AppointmentsList
          appointments={upcoming}
          setAppointments={setUpcoming}
        />
      )}
    </div>
  );
};

export default AppointmentsPage;
