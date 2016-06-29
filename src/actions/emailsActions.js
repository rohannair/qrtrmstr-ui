import utils from './utils';
import { get, API_ROOT } from '../utils/request';

const LOCATION_ROOT = utils.getDomain() + API_ROOT;

function emailsRetrieved(data) {
  return {
    type: 'EMAILS_RETRIEVED',
    payload: data
  };
}

export const getEmails = (token, offset, limit) =>
  dispatch => get(LOCATION_ROOT + `emails?offset=${offset}&limit=${limit}`, token)
  .then(json => dispatch(emailsRetrieved(json)));
