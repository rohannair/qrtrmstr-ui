import fetch from 'isomorphic-fetch';
import utils from './utils';
const getDomain = utils.getDomain;

// Surveys Retrieved action
function surveysRetrieved(surveyList = {}) {
  return {
    type: 'SURVEYS_RETRIEVED',
    surveyList
  };
}

// Single survey retrieved for editing
function singleSurveyRetrieved(survey = {}) {
  return {
    type: 'SINGLE_SURVEY_RETRIEVED',
    survey
  };
}

// Send Survey To User
export const sendSurvey = (token, payload) => {
  const url = getDomain();
  return dispatch => {
    return fetch(`${url}/api/v1/survey/send`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json().then(json => ({json, response})))
    .then(({json, response}) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return console.log(json);
    });
  };
};

// Get All Surveys
export const getSurveys = token => {
  const url = getDomain();
  return dispatch => {
    return fetch(`${url}/api/v1/surveys`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json().then(json => ({json, response})))
    .then(({json, response}) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return dispatch(surveysRetrieved(json));
    });
  };
};

// Single Survey Call
export const getSingleSurvey = (token, id) => {
  const url = getDomain();
  return dispatch => {
    return fetch(`${url}/api/v1/surveys/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json().then(json => ({json, response})))
    .then(({json, response}) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return dispatch(singleSurveyRetrieved(json));
    });
  };
};

// Create new Survey
export const createSurvey = (token, payload) => {
  const url = getDomain();
  return dispatch => {
    return fetch(`${url}/api/v1/surveys`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json().then(json => ({json, response})))
    .then(({json, response}) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return console.log(json);
    });
  };
};

// Modify existing Survey
export const modifySurvey = (token, payload) => {
  const url = getDomain();
  return dispatch => {
    return fetch(`${url}/api/v1/surveys/${payload.id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(json => {
      return;
    });
  };
};

// Toggle open card
export const toggleOpenCard = (cardID) => {
  return {
    type: 'TOGGLE_OPEN_CARD',
    cardID
  };
};

// Add slide
export const addSlide = (slideID, slideInfo) => {
  return {
    type: 'ADD_SLIDE',
    slideID,
    slideInfo
  };
};

// Remove slide
export const removeSlide = (slideID) => {
  return {
    type: 'REMOVE_SLIDE',
    slideID
  };
};

// Edit slide
export const editSlide = (data) => {
  return {
    type: 'EDIT_SLIDE',
    data
  };
};
