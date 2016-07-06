import {
  USERS_RETRIEVED,
  NEW_USER_CREATED,
  ROLES_RETRIEVED,
  NEW_USER_ERROR_RETRIEVED,
  PASSWORD_RESET,
  PASSWORD_RESET_ERROR,
  RECIEVE_AUTH_URL
} from '../constants';

const initialState = {
  users: { results: [], total: 0 },
  errorMessage: null,
  roles: [],
  message: null,
  authUrl: null
};


export default function app(state = initialState, action) {
  const { type, users, new_user, error_msg, roles, message }  = action;

  switch (type) {
  case USERS_RETRIEVED:
    return {
      ...state,
      users
    };

  case NEW_USER_ERROR_RETRIEVED:
    const newError = (error_msg && (state.errorMessage === error_msg)) ?
      `${error_msg} (again)` : error_msg;
    return {
      ...state,
      errorMessage: newError
    };

  case NEW_USER_CREATED:
    return {
      ...state,
      users: {
        results: [
          ...state.users.results,
          new_user
        ],
        total: state.users.total + 1
      },
      errorMessage: null
    };

  case ROLES_RETRIEVED:
    return {
      ...state,
      roles: roles
    };

  case PASSWORD_RESET:
    return {
      ...state,
      message,
      errorMessage: error_msg
    };

  case PASSWORD_RESET_ERROR:
    return {
      ...state,
      message,
      errorMessage: error_msg
    };

  case RECIEVE_AUTH_URL:
    return {
      ...state,
      authUrl
    };

  default:
    return state;
  }
}
