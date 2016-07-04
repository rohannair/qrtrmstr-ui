import { getDomain } from './utils';
import { filePost, API_ROOT } from '../utils/request';
import {
  UPLOAD_SUCCESS,
  UPLOAD_PENDING,
  UPLOAD_ERROR,
  UPLOAD_DELETE,
} from '../constants';

const LOCATION_ROOT = getDomain() + API_ROOT;

// Users Retrieved action
export function uploadComplete(data) {
  return {
    type: UPLOAD_SUCCESS,
    data
  };
}

export function setLoading() {
  return {
    type: UPLOAD_PENDING
  };
}

export function deleteImage() {
  return {
    type: UPLOAD_DELETE
  };
}

function loadingFailed() {
  return {
    type: UPLOAD_ERROR
  };
}

// Single User Call
export const postUpload = (token, data) =>
  dispatch => filePost(`${LOCATION_ROOT}upload/`, token, data)
  .then(json => dispatch(uploadComplete(json)))
  .catch(err => dispatch(loadingFailed()));
