import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  GetAppContext,
  SetAppContext,
} from '../../Providers/AppContextProvider';
import LoginModal from './LoginModal.js';
import ConfirmUserInfoModal from './Forms/ConfirmUserInfoModal.js';

const Loading = () => <h1>Loading...</h1>;

const ConfirmationModal = ({ appointment, closeModal }) => {
  const history = useHistory();

  const { loggedIn } = useContext(GetAppContext);
  const { setNavDisabled } = useContext(SetAppContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmedInfo, setConfirmedInfo] = useState(false);

  useEffect(() => {
    const bookAppointment = async (appointment) => {
      setLoading(true);
      setNavDisabled(true);
      try {
        await axios.post('/common/appointments', appointment);
        setNavDisabled(false);
        history.push('/appointments');
      } catch (e) {
        console.log(e);
        const error = e.hasOwnProperty('response')
          ? e.response.data
          : e.message;
        setError(error);
        setLoading(false);
        setNavDisabled(false);
      }
    };
    if (loggedIn && confirmedInfo) {
      bookAppointment(appointment);
    }
  }, [confirmedInfo, loggedIn, appointment, history, setNavDisabled]);

  return ReactDOM.createPortal(
    <>
      {loading ? (
        <>
          <div className='overlay'></div>
          <div className='modal'>
            <Loading />
          </div>
        </>
      ) : !loggedIn ? (
        <LoginModal
          closeModal={closeModal}
          setLoading={setLoading}
          error={error}
          setError={setError}
        />
      ) : !confirmedInfo ? (
        <ConfirmUserInfoModal
          setLoading={setLoading}
          closeModal={closeModal}
          setConfirmedInfo={setConfirmedInfo}
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
