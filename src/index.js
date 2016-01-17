import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router';

import App from './containers/App';
import Survey from './containers/Survey';

import configure from './store';

const store = configure();

render(
  <div>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <Route path='survey' component={Survey} />
        </Route>
      </Router>
    </Provider>
  </div>
  ,
  document.getElementById('app')
);
