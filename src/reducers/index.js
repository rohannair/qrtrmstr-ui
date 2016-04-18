import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import accountActions from './login';
import app from './app';
import survey from './survey';
import surveyView from './surveyView';

const reducers = combineReducers({ accountActions, app, survey, routing: routerReducer, surveyAdmin: surveyView });
export default reducers;
