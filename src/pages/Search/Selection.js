import React, { useState } from 'react';
import SelectionJSX from './components/SelectionJSX.js';
import ConfirmationModal from '../Modal/Confirmation.js';

const Selection = ({ selection, date }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointment, setAppointment] = useState(null);

  let timeSelection = null;
  let testsSelection = [];

  const selectTime = (selected) => {
    timeSelection = selected;
  };

  const selectTest = (type) => {
    const index = testsSelection.indexOf(type);
    index === -1 ? testsSelection.push(type) : testsSelection.splice(index, 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      location: selection._id,
      date,
      time: timeSelection,
      tests: testsSelection,
    };
    setAppointment(newAppointment);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {showModal && (
        <ConfirmationModal
          appointment={appointment}
          selection={selection}
          closeModal={handleCloseModal}
        />
      )}
      <SelectionJSX
        selection={selection}
        date={date}
        selectTime={selectTime}
        selectTest={selectTest}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Selection;
