import fetch from 'isomorphic-fetch';
import utils from './utils';
const getDomain = utils.getDomain;
console.log(utils.getDomain);

// Users Retrieved action
function usersRetrieved(users = {}) {
  return {
    type: 'USERS_RETRIEVED',
    users
  };
}

// Get All Users
export const getUsers = token => {
  const url = getDomain();
  return dispatch => {
    return fetch(`${url}/api/v1/users`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      return dispatch(usersRetrieved(json));
    });
  };
};

// Single User Call
export const getSingleUser = (token, id) => {
  const url = getDomain();
  return dispatch => {
    return fetch(`${url}/api/v1/users/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      return dispatch(usersRetrieved(json));
    });
  };
};

// Create new User
export const createUser = (token, payload) => {
  const url = getDomain();
  return dispatch => {
    return fetch(`${url}/api/v1/users`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(json => {
      return;
    });
  };
};

// Modify existing User
export const modifyUser = (token, payload) => {
  const url = getDomain();
  return dispatch => {
    return fetch(`${url}/api/v1/users/${payload.id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(json => {
      return;
    });
  };
};
