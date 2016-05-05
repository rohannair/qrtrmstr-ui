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

export const submitPlaybook = (choices) =>
  dispatch => post(`${LOCATION_ROOT}submitPlaybook`, { id: 3, playbook_results: choices })
  .then(json => ({ type: 'PLAYBOOK_SUBMITTED' }));

export const getPlaybook = (token = '', id) =>
  dispatch => get(`${LOCATION_ROOT}playbooks/${id}`, token)
  .then(playbook => dispatch(playbookRetrieved(playbook)));

function playbookRetrieved(playbook = {}) {
  return {
    type: 'PLAYBOOK_RETRIEVED',
    playbook
  };
}
