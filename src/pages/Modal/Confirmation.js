import React from 'react';
import ReactDOM from 'react-dom';
// import axios from 'axios';
// import LoginModal from './Login/Login.js';

// const Booking = () => <h1>Booking appointment...</h1>;

const ConfirmationModal = ({ appointment, selection, closeModal }) => {
  // const [booking, setBooking] = useState(false);
  // const [confirmation, setConfirmation] = useState(null);

  // const bookAppointment = async (newAppointment) => {
  //   try {
  //     setBooking(true);
  //     const confirmation = await axios.post(
  //       'https://localhost:8000/common/appointments',
  //       newAppointment
  //     );
  //     setConfirmation(confirmation);
  //   } catch (e) {
  //     console.log('Uh-oh! ' + e.message);
  //   } finally {
  //     setBooking(false);
  //   }
  // };

  return ReactDOM.createPortal(
    <>
      <div className='overlay' onClick={closeModal}></div>
      <div className='modal'>
        {/* {!user && <LoginModal />} */}
        {/*  
        {booking && <Booking />}
        {confirmation ? (
          <ConfirmationModal confirmation={confirmation} />
        ) : (
          <>
            <h1>Something went wrong!</h1>
            <button onClick={closeModal}>Close</button>
          </>
        )}
        */}
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default Modal;
