import React, { useState, useEffect } from 'react';
import * as tools from '../Search/tools/tools.js';
import AppointmentItem from './AppointmentItem';

const AppointmentsList = ({ appointments }) => {
  const [appointmentsPlus, setAppointmentsPlus] = useState([]);

  const expand = (_id) => {
    let updateExpanded = [...appointmentsPlus];
    updateExpanded.forEach((appointment) => {
      if (appointment._id.toString() === _id.toString())
        appointment.expanded = !appointment.expanded;
    });
    setAppointmentsPlus(updateExpanded);
  };

  useEffect(() => {
    const locations = JSON.parse(sessionStorage.getItem('allLocations'));
    const updatedAppointments = appointments.map((appointment) => {
      const location = tools.getSelection(appointment.location, locations);
      appointment.name = location.name;
      appointment.address = location.address;
      appointment.phone = location.phone;
      appointment.expanded = false;
      return appointment;
    });
    setAppointmentsPlus(updatedAppointments);
  }, [appointments]);

  return (
    <div id='appointments-list-div'>
      {appointmentsPlus.map((appointment, index) => {
        return (
          <AppointmentItem
            key={index}
            appointment={appointment}
            expand={expand}
          />
        );
      })}
    </div>
  );
};

export default AppointmentsList;
