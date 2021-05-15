import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export const Go = React.createContext();
export const GoProvider = ({ children }) => {
  const history = useHistory();
  const pathname = useLocation().pathname;
  const [goTo, setGoTo] = useState(null);
  const previousPathRef = useRef([pathname]);

  useEffect(() => {
    let timer = null;
    if (goTo) {
      timer = setTimeout(() => {
        if (goTo === 'back') {
          const path = previousPathRef.current.pop();
          history.push(path || '/');
        } else {
          previousPathRef.current.push(pathname);
          history.push(goTo);
        }
        setGoTo(null);
      }, 150);
    } else {
      const elements = document.querySelectorAll('.transition');
      elements.forEach((element) => {
        element.classList.add('show');
      });
    }
    return () => clearTimeout(timer);
  }, [goTo, history, pathname]);

  const go = (to) => {
    const elements = document.querySelectorAll('.transition');
    elements.forEach((element) => {
      element.classList.remove('show');
    });
    setGoTo(to);
  };

  return <Go.Provider value={go}>{children}</Go.Provider>;
};
