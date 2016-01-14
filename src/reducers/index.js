import { combineReducers } from 'redux';

// Reducers
import accountActions from './login';
import app from './app';
import survey from './survey';


const rootReducer = combineReducers({ accountActions, app, survey });

export default rootReducer;
