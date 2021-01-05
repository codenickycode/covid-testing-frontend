import React, { useState } from 'react';
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
    let newLocations = [...locations];
    tools.addAvailableTimes(newLocations, newDate);
    setDate(newDate);
    setLocations(newLocations);
  };

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

  return showSelection ? (
    <Selection selection={selection} date={date} />
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
