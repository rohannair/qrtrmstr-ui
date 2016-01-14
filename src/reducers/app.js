import { merge } from 'lodash';

const initialState = {
  users: {},
};

export default function app(state = initialState, action) {
  switch (action.type) {
  case 'USERS_RETRIEVED':
    return merge({}, state, {users: action.users});
  default:
    return state;
  }
}
