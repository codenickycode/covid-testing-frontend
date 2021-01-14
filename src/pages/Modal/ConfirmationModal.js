import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSetAccount } from '../../Providers/AccountProvider.js';
import { App, Info, SetApp } from '../../Providers/ContextProvider.js';
import { useTryCatchFinally } from '../../tools/useTryCatchFinally.js';
import LoginModal from './LoginModal.js';
import ConfirmUserInfoModal from './Forms/ConfirmUserInfoModal.js';

const ConfirmationModal = ({ closeModal }) => {
  const history = useHistory();
  const { loggedIn } = useContext(App);
  const { appointment } = useContext(Info);
  const setApp = useContext(SetApp);
  const { setAppointments } = useSetAccount();
  const tryCatchFinally = useTryCatchFinally();

  const [infoIsConfirmed, setInfoIsConfirmed] = useState(false);
  const bookingRef = useRef('');

  const bookAppointment = useCallback(() => {
    history.push('/appointments');
    tryCatchFinally(tryFunc, [appointment], catchFunc);
    async function tryFunc(apptArg) {
      const res = await axios.post('/common/appointments', apptArg);
      setAppointments(res.data.appointments);
      setApp((prevState) => ({
        ...prevState,
        confirmation: res.data.confirmation,
      }));
    }
    function catchFunc(error) {
      setApp((prevState) => ({ ...prevState, confirmation: error }));
    }
  }, [appointment, history, setApp, setAppointments, tryCatchFinally]);

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
