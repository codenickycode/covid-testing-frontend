import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  GetLoggedIn,
  GetName,
  GetPhone,
  GetDob,
} from '../../Providers/providers';
import LoginModal from './LoginModal.js';
import ConfirmUserInfoModal from './Forms/ConfirmUserInfoModal.js';

const Loading = () => <h1>Loading...</h1>;

const ConfirmationModal = ({ appointment, closeModal }) => {
  const history = useHistory();

  const loggedIn = useContext(GetLoggedIn);
  const name = useContext(GetName);
  const phone = useContext(GetPhone);
  const dob = useContext(GetDob);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showConfirmUserInfo, setShowConfirmUserInfo] = useState(false);

  useEffect(() => {
    const bookAppointment = async (appointment) => {
      setLoading(true);
      try {
        await axios.post('/common/appointments', appointment);
        history.push('/appointments');
      } catch (e) {
        console.log(e);
        const error = e.response.data || e.message;
        setError(error);
        setLoading(false);
      }
    };

    if (!loggedIn) {
      setShowLogin(true);
    } else if (
      name.firstName === '' ||
      name.lastName === '' ||
      phone.phone === '' ||
      dob.dob === ''
    ) {
      setShowLogin(false);
      setShowConfirmUserInfo(true);
    } else {
      setShowLogin(false);
      setShowConfirmUserInfo(false);
      bookAppointment(appointment);
    }
  }, [
    loggedIn,
    name.firstName,
    name.lastName,
    phone.phone,
    dob.dob,
    appointment,
    history,
  ]);

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
          setLoading={setLoading}
          error={error}
          setError={setError}
        />
      ) : showConfirmUserInfo ? (
        <ConfirmUserInfoModal
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
