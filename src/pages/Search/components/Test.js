import React, { useState } from 'react';
import { ReactComponent as Arrow } from '../../../icons/arrow.svg';

const Test = ({ test, selectedTests, selectTest }) => {
  const [showInfo, setShowInfo] = useState(false);

  const testType = test[0];
  const { name, info } = test[1];

  const handleIconClick = (e) => {
    e.stopPropagation();
    setShowInfo(!showInfo);
  };

  return (
    <div
      className={
        selectedTests.indexOf(testType) !== -1
          ? 'test-type test-selected'
          : 'test-type'
      }
      onClick={(e) => selectTest(e, testType)}
    >
      <label
        className='test-type-label'
        htmlFor={testType}
        id={`label-${testType}`}
      >
        {name}
        <input
          type='checkbox'
          id={testType}
          className='test-checkbox'
          name={testType}
          value='true'
        />
      </label>
      {showInfo && (
        <ul className='test-info'>
          {info.map((item, index) => {
            return (
              <li key={index} className='.info-small'>
                {item}
              </li>
            );
          })}
        </ul>
      )}
      <div className='icon-div' onClick={handleIconClick}>
        <Arrow className={showInfo ? 'icon deg90' : 'icon deg270'} />
      </div>
    </div>
  );
};

export default Test;
