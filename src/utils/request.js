import 'isomorphic-fetch';
import Cookies from 'cookies-js';

export const API_ROOT = '/api/v1/';
export default function request(method, location, token, body) {
  const serializedBody = method !== 'GET'
    ? { body: JSON.stringify(body) }
    : null;

  const jwt = token
    ? { Authorization: `bearer ${ token }` }
    : null;

  const config = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...jwt
    },
    ...serializedBody
  };

  return fetch(location, config)
    .then(response => {
      if (response.status === 401) {
        Cookies.set('token', '', { expires: -1 });
        return window.location = '';
      }
      return response.json();
    })
    .catch(err => console.error(err));
}

export const get = (location, token) => request('GET', location, token);
export const post = (location, token, body) => request('POST', location, token, body);
export const put = (location, token, body) => request('PUT', location, token, body);


export const filePost = (location, token, form) => {
  const jwt = token
    ? { Authorization: `bearer ${ token }` }
    : null;

  const config = {
    method: 'POST',
    headers: {
      ...jwt
    },
    body: form
  };

  return fetch(location, config)
    .then(response => {
      if (response.status === 401) {
        Cookies.set('token', '', { expires: -1 });
        return window.location = '';
      }
      return response.json();
    })
    .catch(err => console.error(err));
};
