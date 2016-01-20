import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

// Reducers
import accountActions from './login';
import app from './app';
import survey from './survey';

const reducers = combineReducers({ accountActions, app, survey, routing: routeReducer });
export default reducers;
