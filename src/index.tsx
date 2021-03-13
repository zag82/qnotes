import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './scss/index.scss';

import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
