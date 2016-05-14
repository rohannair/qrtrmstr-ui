import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import accountActions from './login';
import app from './app';
import playbook from './playbook';
import playbookView from './playbookView';

const reducers = combineReducers({ accountActions, app, playbook, routing: routerReducer, playbookAdmin: playbookView });
export default reducers;
