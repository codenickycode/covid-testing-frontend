import React, { useState, useEffect } from 'react';
import * as tools from './tools/tools.js';
import ResultsJSX from './components/ResultsJSX.js';
import Selection from './Selection.js';

const SearchResults = ({ results }) => {
  const [date, setDate] = useState(tools.today);
  const [locations, setLocations] = useState(results);
  const [selection, setSelection] = useState(null);
  const [showSelection, setShowSelection] = useState(false);

  const handleChangeDate = (type) => {
    let newDate = tools.changeDate(type, date);
    refreshAvailable(newDate);
    setDate(newDate);
  };

  const refreshAvailable = (newDate) => {
    let newLocations = [...locations];
    tools.addAvailableTimes(newLocations, newDate);
    setLocations(newLocations);
  };

  const refreshLocations = (date) => {};

  const handleSortBy = (type) => {
    let newLocations = [...locations];
    tools.sortByDistance(newLocations);
    if (type === 'time') tools.sortByTime(newLocations);
    setLocations(newLocations);
  };

  const handleSelection = (selected) => {
    const selectedLocation = tools.getSelection(selected, locations);
    setSelection(selectedLocation);
    setShowSelection(true);
  };

  useEffect(() => {
    console.log(locations[0].available);
  });

  return showSelection ? (
    <Selection
      selection={selection}
      date={date}
      handleChangeDate={handleChangeDate}
      refreshLocations={refreshLocations}
    />
  ) : (
    <ResultsJSX
      date={date}
      locations={locations}
      handleChangeDate={handleChangeDate}
      handleSortBy={handleSortBy}
      handleSelection={handleSelection}
    />
  );
};

export default SearchResults;
