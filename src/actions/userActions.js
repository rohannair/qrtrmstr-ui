import utils from './utils';
import { get, post, put, API_ROOT } from '../utils/request';

const getDomain = utils.getDomain;
const LOCATION_ROOT = getDomain() + API_ROOT;

// Users Retrieved action
function usersRetrieved(users = {}) {
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

// Get All Users
export const getUsers = token =>
  dispatch => get(LOCATION_ROOT + 'users', token)
  .then(json => dispatch(usersRetrieved(json)));

// Single User Call
export const getSingleUser = (token, id) =>
  dispatch => get(`${LOCATION_ROOT}users/${id}`, token)
  .then(json => dispatch(usersRetrieved(json)));

// Create new User
export const createUser = (token, payload) =>
  dispatch => post(`${LOCATION_ROOT}users`, token, payload)
  .then(json => dispatch(newUserCreated(json)));

// Modify existing User
export const modifyUser = (token, payload) =>
  dispatch => put(`${LOCATION_ROOT}users/${payload.id}`, token, payload)
  .then(json => console.log(json));
