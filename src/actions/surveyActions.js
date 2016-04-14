import fetch from 'isomorphic-fetch';

export const setSelection = id => {
  return {
    type: 'SURVEY_SELECTION',
    id
  };
};

export const submitSurvey = (choices) => {
  return dispatch => {
    return fetch('http://localhost:3000/api/v1/submitSurvey', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: 3,
        survey_results: choices
      })
    })
    .then(response => response.json())
    .then(json => {
      return {
        type: 'SURVEY_SUBMITTED'
      };
    });
  };
};

export const getSurvey = (token = '', id) => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/surveys/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(survey => {
      return dispatch(surveyRetrieved(survey));
    });
  };
};

function surveyRetrieved(survey = {}) {
  return {
    type: 'SURVEY_RETRIEVED',
    survey
  };
}
