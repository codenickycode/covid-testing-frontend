import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = ({ title }) => {
  const history = useHistory();
  return (
    <>
      <header className='header'>
        <Link to='#'>
          <button id='btn-back' className='btn' onClick={history.goBack}>
            Back
          </button>
        </Link>
        <h1 className='title'>{title}</h1>
        <button id='btn-edit' className='btn'>
          Edit
        </button>
      </header>
    </>
  );
};

export default Header;
