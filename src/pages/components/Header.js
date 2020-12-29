import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { AppContext } from '../../ContextProvider.js';

const Header = () => {
  const history = useHistory();
  // const { title } = useContext(AppContext);
  return (
    <>
      <header className='header'>
        <Link to='#'>
          <button id='btn-back' className='btn' onClick={history.goBack}>
            Back
          </button>
        </Link>
        <h1 className='title'>TITLE</h1>
        <button id='btn-edit' className='btn'>
          Edit
        </button>
      </header>
    </>
  );
};

export default Header;
