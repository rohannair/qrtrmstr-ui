import { merge } from 'lodash';

const initialState = {
  token: null
};

export default function accountActions(state = initialState, action) {
  switch (action.type) {
  case 'LOG_IN':
    return merge({}, state, {token: action.token});
  case 'LOG_OUT':
    return merge({}, state, {token: null});
  default:
    return state;
  }

};
