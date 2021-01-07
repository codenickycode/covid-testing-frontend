import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import * as tools from './Search/tools/tools.js';
import { User } from '../Providers/User.js';
import AppointmentsList from './Appointments/AppointmentsList.js';

const Error = ({ error }) => <h1>{error}</h1>;
const Loading = () => <h1>Loading...</h1>;

const sortAppointments = (appointments) => {
  let upcoming = [];
  let past = [];
  appointments.forEach((appointment) => {
    if (dayjs(appointment.date).isBefore(dayjs(tools.TODAY))) {
      past.push(appointment);
    } else {
      upcoming.push(appointment);
    }
  });
  return [upcoming, past];
};

const Appointments = () => {
  const user = useContext(User);
  const [loading, setLoading] = useState(false);
  const [showPast, setShowPast] = useState(false);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/common/appointments');
        const appointments = sortAppointments(res.data);
        setUpcoming(appointments[0]);
        setPast(appointments[1]);
      } catch (e) {
        console.log(e);
        const error = e.response.data || e.message;
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [user]);

  return loading ? (
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
      {showPast ? (
        <AppointmentsList appointments={past} />
      ) : (
        <AppointmentsList appointments={upcoming} />
      )}
    </div>
  );
};

export default Appointments;
