import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

console.log('Dev?', !!__DEV__)
const createStoreWithMiddleware = !!__DEV__
? applyMiddleware(
  thunkMiddleware,
  createLogger()
)(createStore)
: applyMiddleware(
  thunkMiddleware
)(createStore);

export default function configure(rootReducer, initialState) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStoreWithMiddleware;

  const store = create(rootReducer, initialState);

  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', _ => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};
