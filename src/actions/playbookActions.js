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

export const playbookSubmitted = playbook => {
  return {
    type: 'PLAYBOOK_SUBMITTED',
    playbook
  };
};

export const getPlaybook = (token = '', id) =>
  dispatch => get(`${LOCATION_ROOT}playbooks/${id}`, token)
  .then(playbook => dispatch(playbookRetrieved(playbook)));

export const submitPlaybook = (data, id) => {
  return dispatch => {
    return fetch(`${LOCATION_ROOT}playbooks/submit/${id}`, {
      method: 'PUT',
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
      return dispatch(playbookSubmitted(json.result));
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

function playbookRetrieved(playbook = {}) {
  return {
    type: 'PLAYBOOK_RETRIEVED',
    playbook
  };
}
