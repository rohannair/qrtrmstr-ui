import fetch from 'isomorphic-fetch';

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

//show Modal to send a survey to a user
export const toggleSurveyModal = () => {
  return {
    type: 'TOGGLE_SEND_SURVEY_MODAL'
  };
};


//update chosenUser to send Survey to
//  export const updateChosenUser = (updatedChosenUser) => {
//   return {
//     type: 'UPDATE_CHOSEN_USER',
//     updatedChosenUser
//   };
// }

//Send Survey To User
export const sendSurvey = (token, payload) => {
  console.log(payload)
  
  return dispatch => {
    return fetch('http://localhost:3001/api/v1/survey/send', {
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
  return dispatch => {
    return fetch('http://localhost:3000/api/v1/surveys', {
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
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/surveys/${id}`, {
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
  return dispatch => {
    return fetch('http://localhost:3000/api/v1/surveys', {
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
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/surveys/${payload.id}`, {
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
