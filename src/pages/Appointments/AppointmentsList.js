import React from 'react';
import AppointmentItem from './AppointmentItem';

const AppointmentsList = ({ appointments, setAppointments }) => {
  const expand = (_id) => {
    let updateExpanded = [...appointments];
    updateExpanded.forEach((appointment) => {
      if (appointment._id.toString() === _id.toString())
        appointment.expanded = !appointment.expanded;
    });
    setAppointments(updateExpanded);
  };

  return (
    <div>
      {appointments.map((appointment, index) => {
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
