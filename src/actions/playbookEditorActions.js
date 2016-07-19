import { get, post, API_ROOT } from '../utils/request';
import {
  SAVING_PLAYBOOK,
  ADD_SLIDE,
  REMOVE_SLIDE,
  EDIT_SLIDE,
  PLAYBOOK_ORDER_MODIFIED,
  PLAYBOOK_MODIFIED,
  SINGLE_PLAYBOOK_RETRIEVED,
} from '../constants';

// Save playbook interstitial state
export const isSaving = () => {
  return {
    type: SAVING_PLAYBOOK
  };
};

// Update state
export const editPlaybook = (slide_number, data) => {
  return {
    type: EDIT_SLIDE,
    slide_number,
    data
  };
};

// Add slide
export const addSlide = (slideID, slideInfo) => {
  return {
    type: ADD_SLIDE,
    slideID,
    slideInfo
  };
};

// Remove slide
export const removeSlide = (slideID) => {
  return {
    type: REMOVE_SLIDE,
    slideID
  };
};

// Reorder slides
export const reorderPlaybook = (idx, direction) => {
  return {
    type: PLAYBOOK_ORDER_MODIFIED,
    idx,
    direction
  };
};

// Single playbook retrieved for editing
function singlePlaybookRetrieved(data) {
  return {
    type: SINGLE_PLAYBOOK_RETRIEVED,
    playbook: data.playbook,
    users: data.users
  };
};

// Single Playbook Call
export const getSinglePlaybook = (token, id) =>
  dispatch => get(`${API_ROOT}playbooks/${id}`, token)
  .then(data => dispatch(singlePlaybookRetrieved(data)));

// Playbook has been modified
export const playbookModified = (newPlaybook) => {
  return {
    type: PLAYBOOK_MODIFIED,
    newPlaybook
  };
};

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
