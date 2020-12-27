import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import { ContextProvider } from './ContextProvider.js';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
