import React from 'react';
import * as icons from '../../../icons';
import { Submit, WithIcon } from '../../../components';

const SelectionJSX = ({
  selection,
  date,
  handleChangeDate,
  time,
  setTime,
  selectTest,
  selectedTests,
  handleSubmit,
}) => {
  const { name, phone, address, tests, available } = selection;

  return (
    <div id='selection' className='page transition show'>
      <form onSubmit={handleSubmit}>
        <Name name={name} />
        <Address phone={phone} address={address} />
        <Date handleChangeDate={handleChangeDate} date={date} />
        <Time time={time} setTime={setTime} available={available} />
        <Tests
          tests={tests}
          selectedTests={selectedTests}
          selectTest={selectTest}
        />
        <Info />
        <h1>Looks good?</h1>
        <Submit
          disabled={!time || selectedTests.length === 0}
          label='Continue'
        />
      </form>
    </div>
  );
};

export default SelectionJSX;

const Item = ({ icon, header, children }) => {
  return (
    <div className='item'>
      <WithIcon icon={icon}>{header()}</WithIcon>
      <WithIcon icon={icons.spacer}>{children}</WithIcon>
    </div>
  );
};

const Name = ({ name }) => {
  return (
    <WithIcon addClass='item' icon={icons.logo}>
      <h1>{name}</h1>
    </WithIcon>
  );
};

const AddressHeader = () => <h2>Address</h2>;
const Address = ({ phone, address }) => {
  return (
    <Item icon={icons.address} header={AddressHeader}>
      <div>
        <p className='p-bottom-half'>
          {'(' + phone.substr(0, 3) + ')' + phone.substr(3)}
        </p>
        <p>
          {address.street}, {address.city}, {address.state} {address.zip}
        </p>
      </div>
    </Item>
  );
};

const DateHeader = () => <h2>Date</h2>;
const Date = ({ handleChangeDate, date }) => {
  const ArrowLeft = icons.ArrowLeft;
  const ArrowRight = icons.ArrowRight;
  return (
    <Item icon={icons.calendar} header={DateHeader}>
      <ArrowLeft onClick={() => handleChangeDate('dec')} />
      <p>{date}</p>
      <ArrowRight onClick={() => handleChangeDate('inc')} />
    </Item>
  );
};

const TimeHeader = () => () => (
  <h2>
    Time <span className='required'>*required</span>
  </h2>
);
const Time = ({ time, setTime, available }) => {
  return (
    <Item icon={icons.time} header={TimeHeader}>
      <select
        className={!time ? 'select-error' : ''}
        defaultValue='default'
        onChange={(e) => setTime(e.target.value)}
      >
        <option disabled value='default'>
          Choose time
        </option>
        {available.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </Item>
  );
};

const TestsHeader = () => (
  <h2 id='selection-test'>
    Test Types <span className='smaller red'>*required</span>
  </h2>
);
const Tests = ({ tests, selectedTests, selectTest }) => {
  return (
    <Item icon={icons.document} header={TestsHeader}>
      <ul>
        {tests.map((test) => {
          return (
            <li
              key={test}
              className={
                selectedTests.indexOf(test) !== -1
                  ? 'btn-small test-selected'
                  : 'btn-small'
              }
              onClick={() => selectTest(test)}
            >
              {test}
            </li>
          );
        })}
      </ul>
    </Item>
  );
};

const InfoHeader = () => <h2 id='selection-instructions'>Instructions</h2>;
const Info = () => {
  return (
    <Item icon={icons.info} header={InfoHeader}>
      <p>
        Please arrive at the clinic no more than 5 minutes before your
        appointment. <br />
        <br />
        Please wear a mask and maintain 6-foot distance.
      </p>
    </Item>
  );
};
