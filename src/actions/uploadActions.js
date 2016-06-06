import utils from './utils';
import { filePost, API_ROOT } from '../utils/request';

const getDomain = utils.getDomain;
const LOCATION_ROOT = getDomain() + API_ROOT;

// Users Retrieved action
export function uploadComplete(data) {
  debugger;
  return {
    type: 'UPLOAD_SUCCESSFUL',
    data
  };
}

export function setLoading() {
  return {
    type: 'SET_LOADING'
  };
}

export function deleteImage() {
  return {
    type: 'DELETE_IMAGE'
  };
}

function loadingFailed() {
  return {
    type: 'UPLOAD_FAILED'
  };
}

// Single User Call
export const postUpload = (token, data) =>
  dispatch => filePost(`${LOCATION_ROOT}upload/`, token, data)
  .then(json => dispatch(uploadComplete(json)))
  .catch(err => dispatch(loadingFailed()));
