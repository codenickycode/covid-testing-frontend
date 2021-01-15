import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { NavDisabled } from '../Providers/ContextProvider.js';
import { ReactComponent as InfoIcon } from '../icons/info.svg';
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';

const Header = () => {
  const history = useHistory();
  const navDisabled = useContext(NavDisabled);

  return (
    <>
      <header className='header'>
        <button
          className={navDisabled ? 'btn-small navDisabled' : 'btn-small'}
          disabled={navDisabled}
          onClick={history.goBack}
        >
          <ArrowIcon />
        </button>
        <h3 className='title'>Page Title</h3>
        <div
          className={navDisabled ? 'icon navDisabled' : 'icon'}
          onClick={navDisabled ? null : () => history.push('/information')}
        >
          <InfoIcon />
        </div>
      </header>
    </>
  );
};

export default Header;
