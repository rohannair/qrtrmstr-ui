import utils from './utils';
import request, { get, post, API_ROOT } from '../utils/request';

const getDomain = utils.getDomain;
const LOCATION_ROOT = getDomain() + API_ROOT;

export const setSelection = id => {
  return {
    type: 'PLAYBOOK_SELECTION',
    id
  };
};

export const getPlaybook = (token = '', id) =>
  dispatch => get(`${LOCATION_ROOT}playbooks/${id}`, token)
  .then(data => dispatch(playbookRetrieved(data)));

export const submitPlaybook = (data, id) => {
  return dispatch => {
    return fetch(`${LOCATION_ROOT}playbooks/submit/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json().then(json => ({json, response})))
    .then(({json, response}) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return null;
    });
  };
};

export const updatePlaybookStatus = (data, id) => {
  return dispatch => {
    return fetch(`${LOCATION_ROOT}playbooks/statusUpdate/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json().then(json => ({json, response})))
    .then(({json, response}) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return null;
    });
  };
};

export const editSubmittedPlaybook = (slideKey, data) => {
  return {
    type: 'EDIT_SUBMITTED_PLAYBOOK',
    slideKey,
    data
  };
};

function playbookRetrieved(data = {}) {
  return {
    type: 'PLAYBOOK_RETRIEVED',
    playbook: data.playbook
  };
}
