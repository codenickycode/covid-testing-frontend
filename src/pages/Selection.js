import React, { useState, useContext } from 'react';
import Times from './components/Times.js';
import Modal from './Modal/Modal.js';
import { GetContext, SetContext } from '../ContextProvider.js';

const Selection = () => {
  const getContext = useContext(GetContext);
  const setContext = useContext(SetContext);

  const [showModal, setShowModal] = useState(false);

  const { name, phone, address, tests } = getContext('selectedLocation');
  let timeSelection = null;
  let testsSelection = [];

  const selectTime = (selected) => {
    timeSelection = selected;
  };

  const selectTest = (type) => {
    const index = testsSelection.indexOf(type);
    index === -1 ? testsSelection.push(type) : testsSelection.splice(index, 1);
  };

  const submit = (e) => {
    e.preventDefault();
    const newAppointment = {
      location: selectedLocation._id,
      date,
      time: timeSelection,
      tests: testsSelection,
    };
    setNewAppointment(newAppointment);
    setShowModal(true);
  };

  return (
    <>
      {showModal && <Modal closeModal={() => setShowModal(false)} />}
      <form id='form-confirm' className='form' onSubmit={submit}>
        <div className='location-selection'>
          <h1>{name}</h1>
          <div className='location-basic'>
            <h3>Address</h3>
            <p>{phone}</p>
            <p>{address.street}</p>
            <p>
              {address.city}, {address.state} {address.zip}
            </p>
          </div>
          <div className='location-date'>
            <h3>Date</h3>
            <p>{date}</p>
          </div>
          <div className='select-time'>
            <Times times={selectedLocation.available} selectTime={selectTime} />
          </div>
          <div className='location-tests'>
            <h4>Tests:</h4>
            <ul>
              {tests.map((test, index) => {
                return (
                  <li key={index} onClick={() => selectTest(test)}>
                    {test}
                  </li>
                );
              })}
            </ul>
          </div>
          <h4>Instruction:</h4>
          <p>
            Arrive at the clinic 5 minutes before your appointment and wait for
            your name to be called.
          </p>
          <h1>Looks good?</h1>
          <button type='submit' id='btn-confirm' disabled={false}>
            Confirm
          </button>
        </div>
      </form>
    </>
  );
};

export default Selection;
