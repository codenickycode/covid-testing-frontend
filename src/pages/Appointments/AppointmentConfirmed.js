import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { Header } from '../../components';
import { ReactComponent as ConfirmedSVG } from '../../img/confirmed.svg';
import { SetApp } from '../../Providers/Context';

export default function () {
  const setApp = useContext(SetApp);
  const closeModal = () => {
    setApp((prev) => ({ ...prev, confirmation: '' }));
  };

  return ReactDOM.createPortal(
    <>
      <div className='overlay' onClick={closeModal}></div>
      <div className='modal'>
        <div id='appt-confirmed'>
          <Header header='Appointment confirmed' />
          <ConfirmedSVG />
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}
