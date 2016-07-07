import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  FORGOT_PASSWORD_EMAIL_SENT,
  FORGOT_PASSWORD_ERROR
} from '../constants';

const initialState = {
  token: null,
  error: null,
  message: null
};

export default function accountActions(state = initialState, action) {
  switch (action.type) {
  case LOGIN_SUCCESS:
    return {
      ...state,
      token: action.token
    };

  case LOGIN_FAILURE:
    return {
      error: action.error
    };

  case LOGOUT:
    return {
      token: null
    };

  case FORGOT_PASSWORD_EMAIL_SENT:
    return {
      ...state,
      message: action.message,
      error: action.error
    };

  case FORGOT_PASSWORD_ERROR:
    return {
      ...state,
      message: action.message,
      error: action.error
    };

  default:
    return state;
  }

};
