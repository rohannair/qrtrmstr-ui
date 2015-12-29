import { createStore } from 'redux';
import surveyReducer from '../reducers/survey';

let store = createStore(surveyReducer);
store.subscribe(_=> console.log(store.getState()));

export default store;
