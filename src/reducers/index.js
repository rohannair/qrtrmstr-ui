import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import accountActions from './login';
import app from './app';
import playbook from './playbook';
import playbookView from './playbookView';
import uploader from './uploader';
import emails from './emails';

const reducers = combineReducers({
  accountActions,
  app,
  emails,
  playbook,
  playbookAdmin: playbookView,
  routing: routerReducer,
  uploader
});

export default reducers;
