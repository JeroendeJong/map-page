import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Map from './map';

// initiate map
new Map();

// initiate application
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
