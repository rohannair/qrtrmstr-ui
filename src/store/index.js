import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

const middlewares = [thunkMiddleware];

if (__DEV__) {
  middlewares.push(createLogger())
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

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
