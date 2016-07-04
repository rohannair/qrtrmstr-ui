import utils from './utils';
import { get, post, put, API_ROOT } from '../utils/request';

const getDomain = utils.getDomain;
const LOCATION_ROOT = getDomain() + API_ROOT;

// Users Retrieved action
function usersRetrieved(users = { results: [], total: 0 }) {
  return {
    type: 'USERS_RETRIEVED',
    users
  };
}

// New User successfully created and retrieved
function newUserCreated(new_user = {}) {
  return {
    type: 'NEW_USER_CREATED',
    new_user
  };
}

function rolesRetrieved(roles = {}) {
  return {
    type: 'ROLES_RETRIEVED',
    roles
  };
}

// New User contains errors
export const newUserErrors = (error_msg) => {
  return {
    type: 'NEW_USER_ERROR_RETRIEVED',
    error_msg
  };
};

export const passwordReset = (message) => {
  return {
    type: 'PASSWORD_RESET',
    message,
    error_msg: null
  };
};

export const passwordResetError = (error) => {
  return {
    type: 'PASSWORD_RESET_ERROR',
    message: null,
    error_msg: error
  };
};

export const recieveAuthUrl = (url) => {
  return {
    type: 'RECIEVE_AUTH_URL',
    authUrl: url
  };
};

export const removeAuthLink = () => {
  return {
    type: 'REMOVE_AUTH_URL',
    authUrl: null
  };
};

export const Accountlinked = (message) => {
  return {
    type: 'ACCOUNT_LINKED',
    message
  };
};

export const AccountlinkError = (message) => {
  return {
    type: 'ACCOUNT_LINK_ERROR',
    error_msg: message
  };
};

// Get All Users
export const getUsers = (token, offset, limit) =>
  dispatch => get(LOCATION_ROOT + `users?offset=${offset}&limit=${limit}`, token)
  .then(json => dispatch(usersRetrieved(json)));

// Single User Call
export const getSingleUser = (token, id) =>
  dispatch => get(`${LOCATION_ROOT}users/${id}`, token)
  .then(json => dispatch(usersRetrieved(json)));

// Create new User
export const createUser = (token, payload) =>
  dispatch => post(`${LOCATION_ROOT}users`, token, payload)
  .then(json => {
    if (!json.message) return dispatch(newUserCreated(json));
    return dispatch(newUserErrors(json.message));
  });

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

export const linkAccount = (token, company) =>
  dispatch => get(`${LOCATION_ROOT}auth/${company}`, token)
  .then(json => dispatch(recieveAuthUrl(json.message)));

// export const sendAuthCredentials = (payload, company) =>
//   dispatch => post(`${LOCATION_ROOT}auth/${company}`, null, payload)
//   .then(json => dispatch(Accountlinked(json.message)))
//   .catch(err => dispatch(AccountlinkError(err.message)));
