// Deps
import React from 'react';
import { render } from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { Router, Link, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

// Routes
import Routes from './routes';

// Reducers
import reducers from './reducers';

// Create store
import configure from './store';
const store = configure(reducers);
const history = syncHistoryWithStore(browserHistory, store);

// Draw app
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={ Routes } />
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
