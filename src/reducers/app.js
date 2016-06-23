const initialState = {
  users: [],
  errorMessage: null,
  roles: [],
  message: null
};

export default function app(state = initialState, { type, users, new_user, error_msg, roles, message }) {
  switch (type) {
  case 'USERS_RETRIEVED':
    return {
      ...state,
      users: users
    };

  case 'NEW_USER_ERROR_RETRIEVED':
    const newError = (error_msg && (state.errorMessage === error_msg)) ?
      `${error_msg} (again)` : error_msg;
    return {
      ...state,
      errorMessage: newError
    };

  case 'NEW_USER_CREATED':
    return {
      ...state,
      users: [
        ...state.users,
        new_user
      ],
      errorMessage: null
    };

  case 'ROLES_RETRIEVED':
    return {
      ...state,
      roles: roles
    };

  case 'PASSWORD_RESET':
    return {
      ...state,
      message,
      errorMessage: error_msg
    };

  case 'PASSWORD_RESET_ERROR':
    return {
      ...state,
      message,
      errorMessage: error_msg
    };

  default:
    return state;
  }
}
