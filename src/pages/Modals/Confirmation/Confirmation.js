import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import useCustomHooks from './customHooks.js';
import LoginModal from '../Login/Login.js';
import ConfirmUserInfoModal from '../ConfirmUserInfo/ConfirmUserInfo.js';

const ConfirmationModal = ({ closeModal }) => {
  const { loggedIn, appointment, bookAppointment } = useCustomHooks();
  const [infoIsConfirmed, setInfoIsConfirmed] = useState(false);
  const bookingRef = useRef('');

  useEffect(() => {
    if (!bookingRef.current && loggedIn && infoIsConfirmed) {
      bookingRef.current = 'Booking...';
      bookAppointment(appointment);
    }
  }, [bookingRef, bookAppointment, appointment, loggedIn, infoIsConfirmed]);

  return ReactDOM.createPortal(
    <>
      {!loggedIn ? (
        <LoginModal closeModal={closeModal} />
      ) : !infoIsConfirmed ? (
        <ConfirmUserInfoModal
          closeModal={closeModal}
          setInfoIsConfirmed={setInfoIsConfirmed}
        />
      ) : (
        <>
          <div className='overlay'></div>
          <div className='modal'>
            <h1>{bookingRef.current}</h1>
          </div>
        </>
      )}
    </>,
    document.getElementById('portal')
  );
};

export default ConfirmationModal;
