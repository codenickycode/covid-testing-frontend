import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { User } from '../../Providers/User';
import LoginModal from './Login.js';
import Confirmed from './Confirmation/Confirmed.js';
import Failed from './Confirmation/Failed.js';
import ConfirmUserInfoModal from './Forms/ConfirmUserInfoModal.js';

const Booking = () => <h1>Booking appointment...</h1>;

const ConfirmationModal = ({ appointment, closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(true);
  const [result, setResult] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showConfirmUserInfo, setShowConfirmUserInfo] = useState(false);
  const user = useContext(User);

  const bookAppointment = async (appointment) => {
    setBooking(true);
    let newResult = [null, null];
    try {
      const res = await axios.post('/common/appointments', appointment);
      newResult[1] = res.data;
      setConfirmed(true);
    } catch (e) {
      console.log(e);
      newResult[0] = e.response.data || e.message;
      setConfirmed(false);
    } finally {
      setResult(newResult);
      setBooking(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setShowLogin(true);
    } else if (
      !user.hasOwnProperty('name') ||
      !user.hasOwnProperty('phone') ||
      !user.hasOwnProperty('dob')
    ) {
      setShowLogin(false);
      setShowConfirmUserInfo(true);
    } else {
      setShowLogin(false);
      setShowConfirmUserInfo(false);
      bookAppointment(appointment);
    }
  }, [user, appointment]);

  return ReactDOM.createPortal(
    <>
      {showLogin ? (
        <LoginModal
          closeModal={closeModal}
          loading={loading}
          setLoading={setLoading}
        />
      ) : showConfirmUserInfo ? (
        <ConfirmUserInfoModal closeModal={closeModal} />
      ) : (
        <>
          <div className='overlay'></div>
          <div className='modal'>
            {booking ? (
              <Booking />
            ) : confirmed ? (
              <Confirmed result={result} />
            ) : (
              <Failed result={result} />
            )}
          </div>
        </>
      )}
    </>,
    document.getElementById('portal')
  );
};

export default ConfirmationModal;
