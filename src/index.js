// Deps
import React from 'react';
import { render } from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'redux-simple-router';

// Utils
import { merge } from 'lodash';
import { hasToken } from './utils/auth';

// Components
import App from './containers/App';
import Home from './components/Home';
import Login from './containers/Auth/Login';
import Survey from './containers/Survey';

// Reducers
import reducers from './reducers';

// Create store
import configure from './store';
const store = configure(reducers);

// Helpers
function requireAuth(nextState, replace) {
  if (!hasToken()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

function checkAuth(nextState, replace) {
  if (hasToken()) {
    replace({
      pathname: '/'
    });
  }
}

// Draw app
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} onEnter={requireAuth} />
        <Route path="login" component={Login} onEnter={checkAuth} />
        <Route path="logout" component={Login} />
        <Route path="survey" component={Survey} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
