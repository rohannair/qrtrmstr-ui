import {
  USERS_RETRIEVED,
  NEW_USER_CREATED,
  ROLES_RETRIEVED,
  NEW_USER_ERROR_RETRIEVED,
  PASSWORD_RESET,
  PASSWORD_RESET_ERROR,
  RECIEVE_AUTH_URL,
  USER_DELETED,
  USER_DELETE_ERROR,
  NEW_ROLE_CREATED,
  NEW_ROLE_ERROR_RETRIEVED
} from '../constants';

const initialState = {
  users: { results: [], total: 0 },
  errorMessage: null,
  roles: [],
  message: null,
  authUrl: null
};


export default function app(state = initialState, action) {

  const { type, users, new_user, error_msg, roles, message, authUrl, deletedUserId, new_role }  = action;

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
          new_user,
          ...state.users.results
        ],
        total: state.users.total + 1
      },
      errorMessage: null
    };

  case NEW_ROLE_CREATED:
    return {
      ...state,
      roles: [
        ...state.roles,
        {
          id: new_role.id,
          name: new_role.name
        }
      ],
      errorMessage: null
    };

  case NEW_ROLE_ERROR_RETRIEVED:
    return {
      ...state,
      roleErrorMessage: error_msg
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

  case USER_DELETED:
    return {
      ...state,
      message,
      error_msg: null,
      users: {
        results: state.users.results.filter((val, index) => val.id !== deletedUserId),
        total: state.users.total - 1
      }
    };

  case USER_DELETE_ERROR:
    return {
      ...state,
      message: null,
      errorMessage: error_msg
    };

  default:
    return state;
  }
}
