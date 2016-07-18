import fetch from 'isomorphic-fetch';
import Cookies from 'cookies-js';
import { get, post, API_ROOT } from '../utils/request';

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  FORGOT_PASSWORD_EMAIL_SENT,
  FORGOT_PASSWORD_ERROR
} from '../constants';

// Set Token
export const login = (token = null, hasCookie) => {
  // Set cookie
  if (!hasCookie) {
    Cookies.set('token', token, { expires: 3 * 24 * 60 * 60 * 1000});
  }

  return {
    type: LOGIN_SUCCESS,
    token
  };
};

// Remove token
export const logout = () => {

  // Delete cookie
  Cookies.set('token', '', { expires: -1 });

  return {
    type: LOGOUT
  };
};

// Login failed
const loginFail = (error) => {

  // Delete cookie
  Cookies.set('token', '', { expires: -1 });

  return {
    type: LOGIN_FAILURE,
    error
  };
};

const forgotPasswordEmailSent = (message) => {
  return {
    type: FORGOT_PASSWORD_EMAIL_SENT,
    message,
    error: null
  };
};

const forgotPasswordError = (error) => {
  return {
    type: FORGOT_PASSWORD_ERROR,
    message: null,
    error
  };
};

// Login API call
export const tryLogin = credentials =>
  dispatch => post(`${API_ROOT}login`, null, credentials)
    .then(data => dispatch(login(data.token)))
    .catch(errorText => dispatch(loginFail(errorText)));

export const sendForgotPasswordEmail = payload =>
  dispatch => post(`${API_ROOT}forgotPassword/send`, null, payload)
    .then(data => dispatch(forgotPasswordEmailSent(data.message)))
    .catch(errorText => dispatch(forgotPasswordError(errorText)));
