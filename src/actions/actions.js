import fetch from 'isomorphic-fetch';

export const USERS_RETRIEVED = 'USERS_RETRIEVED';
function usersRetrieved(res = {}) {
  return {
    type: USERS_RETRIEVED,
    users: res,
  };
}

export const getUsers = token => {
  return dispatch => {
    return fetch('http://localhost:3000/api/v1/users', {
      method: 'GET',
      headers: {
        'Authorization': 'bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      dispatch(usersRetrieved(json));
    });
  };
};
