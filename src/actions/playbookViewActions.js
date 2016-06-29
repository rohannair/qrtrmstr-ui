import fetch from 'isomorphic-fetch';
import utils from './utils';
const getDomain = utils.getDomain;

export const isSaving = () => {
  return {
    type: 'SAVING_PLAYBOOK'
  };
};

// Playbooks Retrieved action
function playbooksRetrieved(playbookList = { results: [], total: 0 }) {
  return {
    type: 'PLAYBOOKS_RETRIEVED',
    playbookList
  };
};

// Single playbook retrieved for editing
function singlePlaybookRetrieved(data) {
  return {
    type: 'SINGLE_PLAYBOOK_RETRIEVED',
    playbook: data.playbook,
    users: data.users
  };
};

export const updatePlaybookState = (slide_number, data) => {
  return {
    type: 'EDIT_SLIDE',
    slide_number,
    data
  };
};

function addNewPlaybook(playbook = {}) {
  return {
    type: 'ADD_NEW_PLAYBOOK',
    playbook
  };
}

export const updateMessage = (message) => {
  return {
    type: 'UPDATE_MESSAGE',
    message
  };
};

export const playbookModified = (newPlaybook) => {
  return {
    type: 'PLAYBOOK_MODIFIED',
    newPlaybook
  };
};

export const reorderPlaybook = (idx, direction) => {
  return {
    type: 'PLAYBOOK_ORDER_MODIFIED',
    idx,
    direction
  };
};

// Send Playbook To User
export const sendPlaybook = (token, payload) => {
  const url = getDomain();
  return dispatch => {
    return fetch(`${url}/api/v1/playbook/send`, {
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
      return dispatch(playbookModified(json));
    });
  };
};

export const duplicatePlaybook = (token, id) => {
  const url = getDomain();
  return dispatch => fetch(`${url}/api/v1/playbooks/duplicate`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id})
  })
  .then(response => response.json().then(json => ({json, response})))
  .then(({json, response}) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return dispatch(addNewPlaybook(json.result));
  });
};

export const assignPlaybook = (token, id, userId) => {
  const url = getDomain();
  return dispatch => fetch(`${url}/api/v1/playbooks/${id}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ assigned: userId })
  })
  .then(response => response.json().then(json => ({json, response})))
  .then(({json, response}) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return dispatch(playbookModified(json));
  });
};

// Get All Playbooks
export const getPlaybooks = (token, offset, limit) => {
  const url = getDomain();
  return dispatch => {
    return fetch(`${url}/api/v1/playbooks?offset=${offset}&limit=${limit}`, {
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

      return dispatch(playbooksRetrieved(json));
    });
  };
};

// Single Playbook Call
export const getSinglePlaybook = (token, id) => {
  const url = getDomain();
  return dispatch => {
    return fetch(`${url}/api/v1/playbooks/${id}`, {
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
      return dispatch(singlePlaybookRetrieved(json));
    });
  };
};

// Create new Playbook
export const createPlaybook = (token, payload) => {
  const url = getDomain();
  return dispatch => {
    return fetch(`${url}/api/v1/playbooks`, {
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

// Modify existing Playbook
export const modifyPlaybook = (token, payload, id) => {
  const url = getDomain();

  let body = '';
  for (let key in payload) {
    if (key === 'selected') {
      body += JSON.stringify({ assigned: payload[key].id});
    }
    else {
      body += JSON.stringify({ [key]: payload[key]});
    }
  }

  return dispatch => {
    return fetch(`${url}/api/v1/playbooks/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'bearer ' + token,
        'Content-Type': 'application/json'
      },
      body
    })
    .then(response => response.json().then(json => ({json, response})))
    .then(({json, response}) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return dispatch(playbookModified(json));
    });
  };
};

export const insertNewSlide = (token, id) => {
  const url = getDomain();
  return dispatch => {
    return fetch(`${url}/api/v1/playbooks/addNewSlide/${id}`, {
      method: 'POST',
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
      return dispatch(playbookModified(json));
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
