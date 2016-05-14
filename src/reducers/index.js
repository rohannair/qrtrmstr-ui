import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import accountActions from './login';
import app from './app';
import Playbook from './playbook';
import PlaybookView from './playbookView';

const reducers = combineReducers({ accountActions, app, playbook, routing: routerReducer, playbookAdmin: playbookView });
export default reducers;
