import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { User } from '../../Providers/User';
import LoginModal from './Login.js';
import ConfirmUserInfoModal from './Forms/ConfirmUserInfoModal.js';

const Loading = () => <h1>Loading...</h1>;

const ConfirmationModal = ({ appointment, closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showConfirmUserInfo, setShowConfirmUserInfo] = useState(false);
  const user = useContext(User);

  const bookAppointment = async (appointment) => {
    setLoading(true);
    let newResult = [null, null];
    try {
      const res = await axios.post('/common/appointments', appointment);
      newResult[1] = res.data;
      setConfirmed(true);
    } catch (e) {
      console.log(e);
      const result = e.response.data || e.message;
      newResult[0] = result;
      setError(result);
      setConfirmed(false);
    } finally {
      setResult(newResult);
      setLoading(false);
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
      {loading ? (
        <>
          <div className='overlay'></div>
          <div className='modal'>
            <Loading />
          </div>
        </>
      ) : showLogin ? (
        <LoginModal
          closeModal={closeModal}
          loading={loading}
          setLoading={setLoading}
          error={error}
          setError={setError}
        />
      ) : showConfirmUserInfo ? (
        <ConfirmUserInfoModal
          loading={loading}
          setLoading={setLoading}
          closeModal={closeModal}
          setError={setError}
        />
      ) : (
        <>
          <div className='overlay' onClick={closeModal}></div>
          <div className='modal'>{error}</div>
        </>
      )}
    </>,
    document.getElementById('portal')
  );
};

export default ConfirmationModal;
