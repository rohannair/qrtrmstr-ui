import fetch from 'isomorphic-fetch';
import Cookies from 'cookies-js';

// Action types
export const LOG_IN  = 'LOG_IN';
function login(token = null) {
  return {
    type: LOG_IN,
    token
  };
}

export const LOG_OUT = 'LOG_OUT';
export const logOut = function() {
  return dispatch => dispatch({ type: LOG_OUT });
};

// Action creators
export const tryLogin = credentials => {
  return dispatch => {
    return fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials),
    })
    .then(response => response.json())
    .then(json => {
      console.log(JSON.stringify(json, null, 4));
      Cookies.set('token', json.token, { expires: 3 * 24 * 60 * 60 * 1000});
      dispatch(login(json.token));
    });
  };
};

export const setTokenCookie = token => {
  return dispatch => {
    Cookies.set('token', token, { expires: 3 * 24 * 60 * 60 * 1000});
    dispatch(login(token));
  };
};
