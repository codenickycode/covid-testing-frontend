import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import tools from '../../tools/index.js';
import { App } from '../../Providers/Context.js';
import { Page } from '../../components';
import { AppointmentItem } from './Item';

export default function AppointmentsPage() {
  const { user } = useContext(App);
  const [showPast, setShowPast] = useState(false);

  return !user ? (
    <Redirect to='/gateway/appointments' />
  ) : (
    <Page id='appointments'>
      <AppointmentTabs showPast={showPast} setShowPast={setShowPast} />
      <AppointmentsList showPast={showPast} user={user} />
    </Page>
  );
}

const AppointmentTabs = ({ showPast, setShowPast }) => {
  return (
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
  );
};

const AppointmentsList = ({ showPast, user }) => {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    const appts = [...user.appointments] || [];
    const [upcomingSorted, pastSorted] = tools.sortAppointments(appts);
    setUpcoming(upcomingSorted);
    setPast(pastSorted);
  }, [user]);

  const appointments = showPast ? past : upcoming;

  return (
    <div id='appointments-list'>
      {appointments.length === 0 ? (
        <h1 className='m-top-2 center'>
          No {showPast ? 'past' : 'upcoming'} appointments.
        </h1>
      ) : (
        appointments.map((appointment) => (
          <AppointmentItem key={appointment._id} appointment={appointment} />
        ))
      )}
    </div>
  );
};
