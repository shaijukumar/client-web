import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-widgets/dist/css/react-widgets.css';

import { Router } from 'react-router-dom';
import './app/layouts/styles.css';
import App from './app/layouts/App';
import * as serviceWorker from './serviceWorker';
import ScrollToTop from './app/layouts/ScrollToTop';
import dateFnsLocalizer from 'react-widgets-date-fns';

dateFnsLocalizer();

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <ScrollToTop>
        <App /> 
      </ScrollToTop>

    </Router>

  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
