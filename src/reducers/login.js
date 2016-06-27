const initialState = {
  token: null,
  error: null,
  message: null
};

export default function accountActions(state = initialState, action) {
  switch (action.type) {
  case 'LOG_IN':
    return {
      ...state,
      token: action.token
    };

  case 'LOG_OUT':
    return {
      token: null
    };

  case 'LOG_IN_FAILURE':
    return {
      error: action.error
    };

  case 'FORGOT_PASSWORD_EMAIL_SENT':
    return {
      ...state,
      message: action.message,
      error: action.error
    };

  case 'FORGOT_PASSWORD_ERROR':
    return {
      ...state,
      message: action.message,
      error: action.error
    };

  default:
    return state;
  }

};
