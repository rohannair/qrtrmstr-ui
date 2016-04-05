import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  syncHistory(browserHistory)
)(createStore);

export default function configure(rootReducer, initialState) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStoreWithMiddleware;

  const store = create(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', _ => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};
