import { get, post, API_ROOT } from '../utils/request';
import {
  USERS_RETRIEVED,
  NEW_USER_CREATED,
  ROLES_RETRIEVED,
  NEW_USER_ERROR_RETRIEVED,
  PASSWORD_RESET,
  PASSWORD_RESET_ERROR,
  RECIEVE_AUTH_URL,
  USER_DELETED,
  USER_DELETE_ERROR,
  NEW_ROLE_CREATED,
  NEW_ROLE_ERROR_RETRIEVED
} from '../constants';

// Users Retrieved action
function usersRetrieved(users = { results: [], total: 0 }) {
  return {
    type: USERS_RETRIEVED,
    users
  };
}

// New User successfully created and retrieved
function newUserCreated(new_user = {}) {
  return {
    type: NEW_USER_CREATED,
    new_user
  };
}

function rolesRetrieved(roles = {}) {
  return {
    type: ROLES_RETRIEVED,
    roles
  };
}

// New User contains errors
export const newUserErrors = (error_msg) => {
  return {
    type: NEW_USER_ERROR_RETRIEVED,
    error_msg
  };
};

// New Role successfully created and retrieved
function newRoleCreated(role = {}) {
  return {
    type: NEW_ROLE_CREATED,
    new_role: role
  };
}

// New Role contains errors
export const newRoleErrors = (error_msg) => {
  return {
    type: NEW_ROLE_ERROR_RETRIEVED,
    error_msg
  };
};

export const passwordReset = (message) => {
  return {
    type: PASSWORD_RESET,
    message,
    error_msg: null
  };
};

export const passwordResetError = (error) => {
  return {
    type: PASSWORD_RESET_ERROR,
    message: null,
    error_msg: error
  };
};

export const recieveAuthUrl = (url) => {
  return {
    type: RECIEVE_AUTH_URL,
    authUrl: url
  };
};


export const userDeleted = (data) => {
  return {
    type: USER_DELETED,
    message: data.message,
    deletedUserId: data.id,
    error_msg: null
  };
};

export const userDeleteError = (error_msg) => {
  return {
    type: USER_DELETE_ERROR,
    message: null,
    error_msg
  };
};

// Get All Users
export const getUsers = (token, offset, limit) =>
  dispatch => get(`${API_ROOT}users?offset=${offset}&limit=${limit}`, token)
  .then(data => dispatch(usersRetrieved(data)));

// Single User Call
export const getSingleUser = (token, id) =>
  dispatch => get(`${API_ROOT}users/${id}`, token)
  .then(data => dispatch(usersRetrieved(data)));

// Create new User
export const createUser = (token, payload) =>
  dispatch => post(`${API_ROOT}users`, token, payload)
  .then(data => dispatch(newUserCreated(data)))
  .catch(err => dispatch(newUserErrors(err.message)));

// Modify existing User
export const modifyUser = (token, payload) =>
  dispatch => post(`${API_ROOT}users/${payload.id}`, token, payload)
  .then(data => console.log(data));

// Delete existing User
export const deleteUser = (token, id) =>
  dispatch => post(`${API_ROOT}users/delete/${id}`, token)
  .then(data => dispatch(userDeleted(data)))
  .catch(err => dispatch(userDeleteError(err)));

// Get All Roles
export const getRoles = token =>
  dispatch => get(API_ROOT + 'roles', token)
  .then(data => dispatch(rolesRetrieved(data)));

// Create new Role
export const createRole = (token, payload) =>
  dispatch => post(`${API_ROOT}roles`, token, payload)
  .then(data => dispatch(newRoleCreated(data.message)))
  .catch(err => dispatch(newRoleErrors(err.message)));

export const resetPassword = (payload, userId) =>
  dispatch => post(`${API_ROOT}users/resetPassword/${userId}`, null, payload)
  .then(data => dispatch(passwordReset(data.message)))
  .catch(err => dispatch(passwordResetError(data.message)));

export const linkAccount = (token, company) =>
  dispatch => get(`${API_ROOT}auth/${company}`, token)
  .then(data => dispatch(recieveAuthUrl(data.message)));
