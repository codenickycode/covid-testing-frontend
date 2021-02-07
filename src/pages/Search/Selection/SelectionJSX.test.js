import { render, fireEvent, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SelectionJSX from './SelectionJSX';
import { initLocations } from '../../../tools/mockData/initLocations';

let selection,
  handleChangeDate,
  setTime,
  selectTest,
  selectedTests,
  handleSubmit;

describe('SelectionJSX', () => {
  beforeEach(() => {
    selection = initLocations()[3];
    handleChangeDate = jest.fn();
    setTime = jest.fn();
    selectTest = jest.fn();
    selectedTests = [];
    handleSubmit = jest.fn();
    render(
      <SelectionJSX
        selection={selection}
        date={'January 1, 2021'}
        time={'9:30 AM'}
        handleChangeDate={handleChangeDate}
        setTime={setTime}
        selectTest={selectTest}
        selectedTests={selectedTests}
        handleSubmit={handleSubmit}
      />
    );
  });

  it('renders selected location name', () => {
    expect(document.body.innerHTML).toContain('Health');
  });

  it('renders selected location address and phone', () => {
    expect(document.body.innerHTML).toContain('90210');
    expect(document.body.innerHTML).toContain('999');
  });

  it('renders date passed from props', () => {
    expect(document.body.innerHTML).toContain('January');
  });

  it('renders the selected time passed from props', () => {
    expect(document.body.innerHTML).toContain('9:30');
  });

  it('renders selected location available tests', () => {});
});
