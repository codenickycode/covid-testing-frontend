import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import { Button, Header } from '../../components';
import { ReactComponent as ConfirmedSVG } from '../../img/confirmed.svg';

export default function AppointmentConfirmed() {
  const history = useHistory();

  const goToAppointments = () => {
    history.push('/appointments');
  };

  return ReactDOM.createPortal(
    <>
      <div className='overlay' onClick={goToAppointments}></div>
      <div className='modal'>
        <div id='appt-confirmed'>
          <Header header='Appointment confirmed' />
          <ConfirmedSVG />
          <Button label='View My Appointments' onClick={goToAppointments} />
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}
