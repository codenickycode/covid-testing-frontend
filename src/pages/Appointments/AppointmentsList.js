import React, { useState, useEffect } from 'react';
import * as tools from '../../tools/tools.js';
import AppointmentItem from './AppointmentItem';

const AppointmentsList = ({ appointments, allLocations }) => {
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
    console.log('list allLocations:\n', allLocations);
    const updatedAppointments = appointments.map((appointment) => {
      const location = tools.getSelection(appointment.location, allLocations);
      appointment.name = location.name;
      appointment.address = location.address;
      appointment.phone = location.phone;
      appointment.expanded = false;
      return appointment;
    });
    setAppointmentsPlus(updatedAppointments);
  }, [appointments, allLocations]);

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
