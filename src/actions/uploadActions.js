import { filePost, API_ROOT } from '../utils/request';
import {
  UPLOAD_SUCCESS,
  UPLOAD_PENDING,
  UPLOAD_ERROR,
  UPLOAD_DELETE,
} from '../constants';

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
  dispatch => filePost(`${API_ROOT}upload/`, token, data)
  .then(json => dispatch(uploadComplete(json)))
  .catch(err => dispatch(loadingFailed()));
