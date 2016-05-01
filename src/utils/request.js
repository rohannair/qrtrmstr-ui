import 'isomorphic-fetch';

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
    .then(response => response.json())
    .catch(err => console.error(err));
}

export const get = (location, token) => request('GET', location, token);
export const post = (location, token, body) => request('POST', location, token, body);
export const put = (location, token, body) => request('PUT', location, token, body);
