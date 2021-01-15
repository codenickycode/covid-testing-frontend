import React from 'react';
import { ReactComponent as Arrow } from '../../../icons/arrow.svg';

const Test = ({ test, selectedTests, selectTest, setInfo }) => {
  const testType = test[0];
  const { name, info } = test[1];

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
      <div className='icon deg180' onClick={() => setInfo(info)}>
        <Arrow />
      </div>
    </div>
  );
};

export default Test;
