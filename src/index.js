import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Map from './map';
import Config from './config';

// initiate map
const config = new Config();
const map = new Map(config);

// initiate application
ReactDOM.render(
  <App map={map}/>,
  document.getElementById('root')
);
