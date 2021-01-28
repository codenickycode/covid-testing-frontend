import React, { useState } from 'react';
import { ReactComponent as ArrowIcon } from '../../../icons/Arrow.svg';

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
          ? 'flex-col type selected'
          : 'flex-col type'
      }
      onClick={(e) => selectTest(e, testType)}
    >
      <h2>{name}</h2>
      <hr />
      <div className='flex-row more' onClick={handleIconClick}>
        <p className='small bold'>{showInfo ? 'Less info' : 'Learn more'}</p>
        <ArrowIcon className={showInfo ? 'icon deg270' : 'icon deg90'} />
      </div>
      {showInfo && (
        <ul>
          {info.map((item, index) => {
            return (
              <li key={index} className='small'>
                {item}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Test;
