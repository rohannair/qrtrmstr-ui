// Deps
import React from 'react';
import { render } from 'react-dom';
import { AppContainer as HotLoaderContainer } from 'react-hot-loader';

// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';

// import { Router, Link, browserHistory } from 'react-router';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import Root from './containers/Root';
const rootEl = document.getElementById('app');

// Routes
// import Routes from './routes';

// Reducers
import reducers from './reducers';

// Create store
import configure from './store';
const store = configure(reducers);
import configureRoutes from './routes';
const routes = configureRoutes(store);

// const history = syncHistoryWithStore(browserHistory, store);

render(
  <HotLoaderContainer>
    <Root store={ store } routes={ routes} />
  </HotLoaderContainer>
,
  rootEl
);

if (__DEV__ && module.hot) {
  console.warn('in!');
  module.hot.accept('./containers/Root', () => {
    console.warn('hot! ./containers/Root');
    const NextRoot = require('./containers/Root').default;

    render(
      <HotLoaderContainer>
        <NextRoot store={ store } routes={ routes} />
      </HotLoaderContainer>,
      rootEl
    );
  });
}

// <Provider store={store}>
//   <Router history={browserHistory} routes={ Routes } />
// </Provider>
