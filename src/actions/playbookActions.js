import { get, post, API_ROOT } from '../utils/request';
import {
  PLAYBOOK_RETRIEVED,
  PLAYBOOK_SELECTED,
  SUBMITTED_PLAYBOOK_UPDATE,
} from '../constants';

export const setSelection = id => {
  return {
    type: PLAYBOOK_SELECTED,
    id
  };
};

export const editSubmittedPlaybook = (slideKey, data) => {
  return {
    type: SUBMITTED_PLAYBOOK_UPDATE,
    slideKey,
    data
  };
};

function playbookRetrieved(data = {}) {
  const doc = data.playbook.doc;
  const filteredDoc = {};

  for (let k in doc) {
    if (!doc[k].hidden) {
      filteredDoc[k] = doc[k];
    }
  }

  return {
    type: PLAYBOOK_RETRIEVED,
    playbook: {
      ...data.playbook,
      doc: filteredDoc
    }
  };
}

export const getPlaybook = (token = '', id) =>
  dispatch => get(`${API_ROOT}get_playbook/${id}`, token)
  .then(data => dispatch(playbookRetrieved(data)));

export const submitPlaybook = (data, id) =>
  dispatch => post(`${API_ROOT}playbooks/submit/${id}`, null, data) // No token here so we pass in null
  .then(data => dispatch(playbookRetrieved(data)));

export const updatePlaybookStatus = (data, id) =>
  dispatch => post(`${API_ROOT}playbooks/statusUpdate/${id}`, null, data);
