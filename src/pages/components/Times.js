import React, { useState } from 'react';

const Time = ({ times, selectTime }) => {
  const [scroll, setScroll] = useState(0);
  const handleClick = (type) => {
    type === 'dec'
      ? scroll === 0 || setScroll((prevScroll) => prevScroll - 1)
      : scroll === times.length - 3 ||
        setScroll((prevScroll) => prevScroll + 1);
  };
  const span = (i) => (
    <span onClick={() => selectTime(times[scroll + i])}>
      {times[scroll + i]}
    </span>
  );
  return (
    <div id='select-time'>
      <button id='time-dec' onClick={() => handleClick('dec')}>
        &lt;
      </button>
      {times[scroll] && span(0)}
      {times[scroll + 1] && span(1)}
      {times[scroll + 2] && span(2)}
      <button id='time-inc' onClick={() => handleClick('inc')}>
        &gt;
      </button>
    </div>
  );
};

export default Time;
