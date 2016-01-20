import fetch from 'isomorphic-fetch';
import Cookies from 'cookies-js';

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

// Login API call
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
    .then(({ token }) => {
      return dispatch(login(token));
    });
  };
};
