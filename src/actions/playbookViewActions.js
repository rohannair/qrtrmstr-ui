import fetch from 'isomorphic-fetch';
import { getDomain } from './utils';
import { get, post, API_ROOT } from '../utils/request';
import {
  TOGGLE_OPEN_CARD,
  ADD_SLIDE,
  REMOVE_SLIDE,
  SAVING_PLAYBOOK,
  PLAYBOOKS_RETRIEVED,
  SINGLE_PLAYBOOK_RETRIEVED,
  EDIT_SLIDE,
  ADD_NEW_PLAYBOOK,
  UPDATE_MESSAGE,
  PLAYBOOK_MODIFIED,
  PLAYBOOK_ORDER_MODIFIED,
} from '../constants';

const LOCATION_ROOT = getDomain() + API_ROOT;

// Toggle open card
export const toggleOpenCard = (cardID) => {
  return {
    type: 'TOGGLE_OPEN_CARD',
    cardID
  };
};

// Add slide
export const addSlide = (slideID, slideInfo) => {
  return {
    type: 'ADD_SLIDE',
    slideID,
    slideInfo
  };
};

// Remove slide
export const removeSlide = (slideID) => {
  return {
    type: 'REMOVE_SLIDE',
    slideID
  };
};

export const updatePlaybookState = (slide_number, data) => {
  return {
    type: 'EDIT_SLIDE',
    slide_number,
    data
  };
};

export const isSaving = () => {
  return {
    type: 'SAVING_PLAYBOOK'
  };
};

// Playbooks Retrieved action
function playbooksRetrieved(playbookList = { results: [], total: 0 }) {
  return {
    type: 'PLAYBOOKS_RETRIEVED',
    playbookList
  };
};

// Single playbook retrieved for editing
function singlePlaybookRetrieved(data) {
  return {
    type: 'SINGLE_PLAYBOOK_RETRIEVED',
    playbook: data.playbook,
    users: data.users
  };
};


function addNewPlaybook(playbook = {}) {
  return {
    type: 'ADD_NEW_PLAYBOOK',
    playbook
  };
}

export const updateMessage = (message) => {
  return {
    type: 'UPDATE_MESSAGE',
    message
  };
};

export const playbookModified = (newPlaybook) => {
  return {
    type: 'PLAYBOOK_MODIFIED',
    newPlaybook
  };
};

export const reorderPlaybook = (idx, direction) => {
  return {
    type: 'PLAYBOOK_ORDER_MODIFIED',
    idx,
    direction
  };
};

// Send Playbook To User
export const sendPlaybook = (token, payload) =>
  dispatch => post(`${LOCATION_ROOT}playbook/send`, token, payload)
  .then(data => dispatch(playbookModified(data)));

export const duplicatePlaybook = (token, id) =>
  dispatch => post(`${LOCATION_ROOT}playbooks/duplicate`, token, {id})
  .then(data => dispatch(addNewPlaybook(data.result)));

export const assignPlaybook = (token, id, userId) =>
  dispatch => post(`${LOCATION_ROOT}playbooks/${id}`, token, { assigned: userId })
  .then(data => dispatch(playbookModified(json)));

// Get All Playbooks
export const getPlaybooks = (token, offset, limit) =>
  dispatch => get(`${LOCATION_ROOT}playbooks?offset=${offset}&limit=${limit}`, token)
  .then(data => dispatch(playbooksRetrieved(data)));

// Single Playbook Call
export const getSinglePlaybook = (token, id) =>
  dispatch => get(`${LOCATION_ROOT}playbooks/${id}`, token)
  .then(data => dispatch(singlePlaybookRetrieved(data)));

// Create new Playbook
export const createPlaybook = (token, payload) =>
  dispatch => post(`${LOCATION_ROOT}playbooks`, token, payload)
  .then(data => console.log(data));


// Modify existing Playbook
export const modifyPlaybook = (token, payload, id) => {
  let body = '';
  for (let key in payload) {
    if (key === 'selected') {
      body += JSON.stringify({ assigned: payload[key].id});
    } else {
      body += JSON.stringify({ [key]: payload[key]});
    }
  }

  return dispatch => post(`${LOCATION_ROOT}playbooks/${id}`, token, body)
  .then(data => dispatch(playbookModified(json)));
};
