import fetch from 'isomorphic-fetch';

// Users Retrieved action
function usersRetrieved(users = {}) {
  return {
    type: 'USERS_RETRIEVED',
    users
  };
}

// function toggleNewUserModal() {
  
// }

//show Modal to Create New User
export const newUserModal = () => {
  return {
    type: 'TOGGLE_NEW_USER_MODAL'
  };
};



// Get All Users
export const getUsers = token => {
  return dispatch => {
    return fetch('http://localhost:3000/api/v1/users', {
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
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/users/${id}`, {
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
  return dispatch => {
    return fetch('http://localhost:3000/api/v1/users', {
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

// Modify existing User
export const modifyUser = (token, payload) => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/users/${payload.id}`, {
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
