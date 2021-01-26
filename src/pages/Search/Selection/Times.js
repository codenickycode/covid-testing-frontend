import React, { useState } from 'react';
import { ReactComponent as ArrowIcon } from '../../../icons/Arrow.svg';

const Time = ({ times, time, setTime }) => {
  const [scroll, setScroll] = useState(0);
  const handleClick = (type) => {
    type === 'dec'
      ? scroll === 0 || setScroll((prevScroll) => prevScroll - 1)
      : scroll === times.length - 3 ||
        setScroll((prevScroll) => prevScroll + 1);
  };
  const span = (i) => (
    <span
      className={
        times[scroll + i] === time ? 'btn-small time-selected' : 'btn-small'
      }
      onClick={() => setTime(times[scroll + i])}
    >
      {times[scroll + i]}
    </span>
  );
  return (
    <div id='appointment-times'>
      <div className='icon' onClick={() => handleClick('dec')}>
        <ArrowIcon />
      </div>
      {times[scroll] && span(0)}
      {times[scroll + 1] && span(1)}
      {times[scroll + 2] && span(2)}
      <div className='icon deg180' onClick={() => handleClick('inc')}>
        <ArrowIcon />
      </div>
    </div>
  );
};

export default Time;
