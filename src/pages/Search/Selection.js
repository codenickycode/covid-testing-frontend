import React, { useState } from 'react';
import SelectionJSX from './components/SelectionJSX.js';
import ConfirmationModal from '../Modal/Confirmation.js';

const Selection = ({ selection, date, handleChangeDate }) => {
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
    if (!timeSelection || testsSelection.length === 0) return;
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
          closeModal={handleCloseModal}
        />
      )}
      <SelectionJSX
        selection={selection}
        date={date}
        handleChangeDate={handleChangeDate}
        selectTime={selectTime}
        selectTest={selectTest}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Selection;
