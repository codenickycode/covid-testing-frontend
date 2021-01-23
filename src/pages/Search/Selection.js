import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { App, Refresh, SetApp } from '../../Providers/Context.js';
import SelectionJSX from './Selection/SelectionJSX.js';
import ConfirmationModal from '../Modals/Confirmation/Confirmation.js';
import { Preferences } from '../../Providers/Preferences.js';
import useCustomHooks from '../../tools/useCustomHooks';

const Selection = ({ selection, date, handleChangeDate, refreshLocations }) => {
  const setApp = useContext(SetApp);
  const { preferences } = useContext(Preferences);
  const { loggedIn } = useContext(App);
  const refresh = useContext(Refresh);
  const { getClient } = useCustomHooks();

  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState('');
  const [selectedTests, setSelectedTests] = useState([]);

  const selectTest = (type) => {
    let newTests = [...selectedTests];
    const index = selectedTests.indexOf(type);
    index === -1 ? newTests.push(type) : newTests.splice(index, 1);
    setSelectedTests(newTests);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!time || selectedTests.length === 0) return;
    if (loggedIn && refresh) await getClient();
    const newAppointment = {
      location: selection,
      date,
      time: time,
      tests: selectedTests,
    };
    setApp((prevState) => ({ ...prevState, appointment: newAppointment }));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    refreshLocations(date);
  };

  return !selection ? (
    <Redirect to='/search/form' />
  ) : (
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
