import React, { useState, useContext } from 'react';
import { SetInfo } from '../../Providers/ContextProvider.js';
import SelectionJSX from './components/SelectionJSX.js';
import ConfirmationModal from '../Modal/ConfirmationModal.js';

const Selection = ({ selection, date, handleChangeDate, refreshLocations }) => {
  const setInfo = useContext(SetInfo);

  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState('');
  const [selectedTests, setSelectedTests] = useState([]);

  const selectTest = (type) => {
    let newTests = [...selectedTests];
    const index = selectedTests.indexOf(type);
    index === -1 ? newTests.push(type) : newTests.splice(index, 1);
    setSelectedTests(newTests);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!time || selectedTests.length === 0) return;
    const newAppointment = {
      location: selection,
      date,
      time: time,
      tests: selectedTests,
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
        time={time}
        setTime={setTime}
        selectedTests={selectedTests}
        selectTest={selectTest}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Selection;
