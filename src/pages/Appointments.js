import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import * as tools from '../tools/tools.js';
import {
  GetAppContext,
  SetAppContext,
} from '../Providers/AppContextProvider.js';
import AppointmentsList from './Appointments/AppointmentsList.js';
import LoginModal from './Modal/LoginModal.js';

const Error = ({ error }) => <h1>{error}</h1>;
const Loading = () => <h1>Loading...</h1>;

const sortByTime = (appointments) => {
  if (appointments.length === 0) return appointments;
  let dates = {};
  appointments.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
  appointments.forEach((appointment) => {
    if (!dates[appointment.date]) {
      dates[appointment.date] = [appointment];
    } else {
      dates[appointment.date].push(appointment);
    }
  });
  let sorted = [];
  for (let [, v] of Object.entries(dates)) {
    if (v.length === 1) {
      sorted.push(...v);
    } else {
      tools.sortAppointmentsByTime(v);
      sorted.push(...v);
    }
  }
  return sorted;
};

const sortAppointments = (appointments) => {
  if (appointments.length === 0) return [[], []];
  let upcoming = [];
  let past = [];
  appointments.forEach((appointment) => {
    if (dayjs(appointment.date).isBefore(dayjs(tools.TODAY))) {
      past.push(appointment);
    } else {
      upcoming.push(appointment);
    }
  });
  const upcomingSorted = sortByTime(upcoming);
  const pastSorted = sortByTime(past);
  return [upcomingSorted, pastSorted];
};

const Appointments = () => {
  const history = useHistory();
  const {
    loggedIn,
    allLocations,
    appointments,
    appointmentsLoaded,
  } = useContext(GetAppContext);
  const {
    setAllLocations,
    setAppointments,
    setAppointmentsLoaded,
  } = useContext(SetAppContext);

  const [loading, setLoading] = useState(false);
  const [showPast, setShowPast] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const locations = await tools.getLocations;
        setAllLocations(locations);
      } catch (e) {
        console.log(e);
        const error = e.hasOwnProperty('response')
          ? e.response.data
          : e.message;
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (allLocations.length === 0) fetchLocations();
  }, [loading, allLocations, setAllLocations]);

  useEffect(() => {
    if (!loggedIn) return;
    if (allLocations.length === 0) return;

    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/common/appointments');
        const newAppointments = sortAppointments(res.data);
        setAppointments({
          upcoming: newAppointments[0],
          past: newAppointments[1],
        });
        setAppointmentsLoaded(true);
      } catch (e) {
        console.log(e);
        const error = e.hasOwnProperty('response')
          ? e.response.data
          : e.message;
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (!appointmentsLoaded) fetchAppointments();
  }, [
    loggedIn,
    allLocations,
    setAppointments,
    appointmentsLoaded,
    setAppointmentsLoaded,
  ]);

  return !loggedIn ? (
    <LoginModal
      closeModal={history.goBack}
      setLoading={setLoading}
      error={error}
      setError={setError}
    />
  ) : loading ? (
    <Loading />
  ) : error ? (
    <Error error={error} />
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
      {appointmentsLoaded &&
        (showPast ? (
          appointments.past.length === 0 ? (
            <h1>No past appointments.</h1>
          ) : (
            <AppointmentsList
              appointments={appointments.past}
              allLocations={allLocations}
            />
          )
        ) : appointments.upcoming.length === 0 ? (
          <h1>No upcoming appointments.</h1>
        ) : (
          <AppointmentsList
            appointments={appointments.upcoming}
            allLocations={allLocations}
          />
        ))}
    </div>
  );
};

export default Appointments;
