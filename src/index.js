import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Map from './map';
import Config from './config';

// initiate map
const map = new Map();
const config = new Config();

// initiate application
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
