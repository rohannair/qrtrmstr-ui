import { get, post, API_ROOT } from '../utils/request';
import {
  PLAYBOOKS_RETRIEVED,
  ADD_NEW_PLAYBOOK,
  UPDATE_MESSAGE,
  PLAYBOOK_MODIFIED,
} from '../constants';

export const isSaving = () => {
  return {
    type: SAVING_PLAYBOOK
  };
};

// Playbooks Retrieved action
function playbooksRetrieved(playbookList = { results: [], total: 0 }) {
  return {
    type: PLAYBOOKS_RETRIEVED,
    playbookList
  };
};

function addNewPlaybook(playbook = {}) {
  return {
    type: ADD_NEW_PLAYBOOK,
    playbook
  };
}

export const updateMessage = (message) => {
  return {
    type: UPDATE_MESSAGE,
    message
  };
};

export const playbookModified = (newPlaybook) => {
  return {
    type: PLAYBOOK_MODIFIED,
    newPlaybook
  };
};

export const reorderPlaybook = (idx, direction) => {
  return {
    type: PLAYBOOK_ORDER_MODIFIED,
    idx,
    direction
  };
};

// Send Playbook To User
export const sendPlaybook = (token, payload) =>
  dispatch => post(`${API_ROOT}playbook/send`, token, payload)
  .then(data => dispatch(playbookModified(data)));

export const duplicatePlaybook = (token, id) =>
  dispatch => post(`${API_ROOT}playbooks/duplicate`, token, {id})
  .then(data => dispatch(addNewPlaybook(data.result)));

export const assignPlaybook = (token, id, userId) =>
  dispatch => post(`${API_ROOT}playbooks/${id}`, token, { assigned: userId })
  .then(data => dispatch(playbookModified(data)));

// Get All Playbooks
export const getPlaybooks = (token, offset, limit) =>
  dispatch => get(`${API_ROOT}playbooks?offset=${offset}&limit=${limit}`, token)
  .then(data => dispatch(playbooksRetrieved(data)));

// Create new Playbook
export const createPlaybook = (token, payload) =>
  dispatch => post(`${API_ROOT}playbooks`, token, payload)
  .then(data => console.log(data));

// Modify existing Playbook
export const modifyPlaybook = (token, payload, id) => {
  let body = '';
  for (let key in payload) {
    if (key === 'selected') {
      body = {
        assigned: payload[key].id
      };
    } else {
      body = {
        [key]: payload[key]
      };
    }
  }

  return dispatch => post(`${API_ROOT}playbooks/${id}`, token, body)
  .then(data => dispatch(playbookModified(data)));
};
