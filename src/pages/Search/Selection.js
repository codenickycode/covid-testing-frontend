import React, { useState, useContext } from 'react';
import { SetInfo } from '../../Providers/ContextProvider.js';
import SelectionJSX from './components/SelectionJSX.js';
import ConfirmationModal from '../Modal/ConfirmationModal.js';

const Selection = ({ selection, date, handleChangeDate, refreshLocations }) => {
  const setInfo = useContext(SetInfo);

  const [showModal, setShowModal] = useState(false);

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
      location: selection,
      date,
      time: timeSelection,
      tests: testsSelection,
    };
    setInfo((prevState) => ({ ...prevState, appointment: newAppointment }));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    refreshLocations(date);
    setShowModal(false);
  };

  return (
    <>
      {showModal && <ConfirmationModal closeModal={handleCloseModal} />}
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
