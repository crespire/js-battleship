import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.js';
import { Battleship } from './lib/battleship.js';

console.log('Loaded!');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);