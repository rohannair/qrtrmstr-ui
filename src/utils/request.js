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
    .then(handleErrors)
    .then(response => response);
}

export const get = (location, token) => request('GET', location, token);
export const post = (location, token, body) => request('POST', location, token, body);
export const put = (location, token, body) => request('POST', location, token, body);


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

// Function to handle errors for fetch requests
function handleErrors(response) {
  return response.json()
    .then((responseData) => {
    // If response has a status outside 200-299 then it will be caught here
      if (!response.ok) {
        throw Error(responseData.message);
      }
      return responseData;
    });
}
