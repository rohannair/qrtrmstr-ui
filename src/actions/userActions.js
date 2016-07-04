import { get, post, put, API_ROOT } from '../utils/request';
import { getDomain } from './utils';

import {
  USERS_RETRIEVED,
  NEW_USER_CREATED,
  ROLES_RETRIEVED,
  NEW_USER_ERROR_RETRIEVED,
  PASSWORD_RESET,
  PASSWORD_RESET_ERROR
} from '../constants';

const LOCATION_ROOT = getDomain() + API_ROOT;

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

// Get All Users
export const getUsers = (token, offset, limit) =>
  dispatch => get(`${LOCATION_ROOT}users?offset=${offset}&limit=${limit}`, token)
  .then(json => dispatch(usersRetrieved(json)));

// Single User Call
export const getSingleUser = (token, id) =>
  dispatch => get(`${LOCATION_ROOT}users/${id}`, token)
  .then(json => dispatch(usersRetrieved(json)));

// Create new User
export const createUser = (token, payload) =>
  dispatch => post(`${LOCATION_ROOT}users`, token, payload)
  .then(json => dispatch(newUserErrors(json.message)));

// Modify existing User
export const modifyUser = (token, payload) =>
  dispatch => post(`${LOCATION_ROOT}users/${payload.id}`, token, payload)
  .then(json => console.log(json));

// Get All Roles
export const getRoles = token =>
  dispatch => get(LOCATION_ROOT + 'roles', token)
  .then(json => dispatch(rolesRetrieved(json)));

export const resetPassword = (payload, userId) =>
  dispatch => post(`${LOCATION_ROOT}users/resetPassword/${userId}`, null, payload)
  .then(json => dispatch(passwordReset(json.message)))
  .catch(err => dispatch(passwordResetError(json.message)));
