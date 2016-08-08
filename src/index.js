import 'babel-polyfill';

// Deps
import React from 'react';
import { render } from 'react-dom';
import { AppContainer as HotLoaderContainer } from 'react-hot-loader';

// Root Container
import Root from './containers/Root';
const rootEl = document.getElementById('app');

// Reducers
import reducers from './reducers';

// Create store
import configure from './store';
const store = configure(reducers);

// Routes
import configureRoutes from './routes';
const routes = configureRoutes(store);

// Render
render(
  <HotLoaderContainer>
    <Root store={ store } routes={ routes} />
  </HotLoaderContainer>,
  rootEl
);

// Hot Module Reloading
if (__DEV__ && module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root').default;

    render(
      <HotLoaderContainer>
        <NextRoot store={ store } routes={ routes} />
      </HotLoaderContainer>,
      rootEl
    );
  });
}
