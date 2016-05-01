import utils from './utils';
import request, { get, API_ROOT } from '../utils/request';

const getDomain = utils.getDomain;
const LOCATION_ROOT = getDomain() + API_ROOT;

export const setSelection = id => {
  return {
    type: 'SURVEY_SELECTION',
    id
  };
};

export const submitSurvey = (choices) => {
  const url = getDomain();
  return dispath => request(
    'POST',
    `${LOCATION_ROOT}submitSurvey`,
    { id: 3, survey_results: choices }
  )
  .then(json => ({ type: 'SURVEY_SUBMITTED' }));
};

export const getSurvey = (token = '', id) => {
  return dispatch => get(`${LOCATION_ROOT}surveys/${id}`, token)
  .then(survey => dispatch(surveyRetrieved(survey)));
};

function surveyRetrieved(survey = {}) {
  return {
    type: 'SURVEY_RETRIEVED',
    survey
  };
}
