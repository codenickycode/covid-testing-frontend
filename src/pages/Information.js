import React, { useContext } from 'react';
import { App, SetApp } from '../Providers/ContextProvider.js';

const Information = () => {
  const { title } = useContext(App);
  const setApp = useContext(SetApp);
  if (title !== 'Information')
    setApp((prevState) => ({ ...prevState, title: 'Information' }));

  return <div id='information-div'></div>;
};

export default Information;
