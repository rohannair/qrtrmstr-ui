import fetch from 'isomorphic-fetch';
import Cookies from 'cookies-js';
import utils from './utils';
const getDomain = utils.getDomain;

// Set Token
export const login = (token = null, hasCookie) => {

  // Set cookie
  if (!hasCookie) {
    Cookies.set('token', token, { expires: 3 * 24 * 60 * 60 * 1000});
  }

  return {
    type: 'LOG_IN',
    token
  };
};

// Remove token
export const logout = () => {

  // Delete cookie
  Cookies.set('token', '', { expires: -1 });

  return {
    type: 'LOG_OUT'
  };
};

// Login failed
const loginFail = (error) => {
  return {
    type: 'LOG_IN_FAILURE',
    error
  };
};

// Login API call
export const tryLogin = credentials => {
  const url = getDomain();
  return dispatch => {
    return fetch(`${url}/api/v1/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials),
    })
    .then(response => response.json().then(json => ({json, response})))
    .then(({ json, response }) => {
      if (!response.ok) return dispatch(loginFail(json.message));
      return dispatch(login(json.result));
    });
  };
};
