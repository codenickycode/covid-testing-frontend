import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { App, NavDisabled } from '../Providers/ContextProvider.js';
import { ReactComponent as InfoIcon } from '../icons/info.svg';
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';

const Header = () => {
  const history = useHistory();
  const { title } = useContext(App);
  const navDisabled = useContext(NavDisabled);

  return (
    <>
      <header className='header'>
        <div
          className={navDisabled ? 'icon-disabled' : 'icon'}
          onClick={navDisabled ? null : history.goBack}
        >
          <ArrowIcon />
        </div>
        <h3 className='title'>{title}</h3>
        <div
          className={
            navDisabled
              ? 'icon-disabled'
              : title === 'Information'
              ? 'icon-active'
              : 'icon'
          }
          onClick={navDisabled ? null : () => history.push('/information')}
        >
          <InfoIcon />
        </div>
      </header>
    </>
  );
};

export default Header;
