import _ from 'lodash';

export const initialState = {
  chosenUser: {},
  list: [],
  playbook: {},
  openCards: [],
  message: null
};

export default function playbookView(state = initialState, action) {

  switch (action.type) {
  case 'PLAYBOOKS_RETRIEVED':
    return {
      ...state,
      list: action.playbookList
    };

  case 'SINGLE_PLAYBOOK_RETRIEVED':
    return {
      ...state,
      playbook: action.playbook
    };

  case  'ADD_NEW_PLAYBOOK':
    return {
      ...state,
      list: [
        ...state.list,
        action.playbook
      ]
    };

  case 'ADD_SLIDE':
    const doc = {
      ...state.playbook.doc,
      [action.slideID]: {
        ...action.slideInfo,
        slide_number: Object.keys(state.playbook.doc).length + 1
      }
    };

    return {
      ...state,
      playbook: {
        ...state.playbook,
        doc
      }
    };

  case 'REMOVE_SLIDE':
    return {
      ...state,
      playbook: {
        ...state.playbook,
        doc: _.omit(state.playbook.doc, [action.slideID])
      }
    };

  case 'EDIT_SLIDE':
    const { slide_number, data } = action;
    const { playbook } = state;

    // If slide doesn't exist (which is weird...)
    if (!(slide_number in playbook.doc)) return state;

    let newState = {
      ...state,
      playbook: {
        ...state.playbook,
        doc: {
          ...playbook.doc,
          [slide_number]: {
            ...playbook.doc[slide_number],
            ...action.data
          }
        }
      }
    };

    return {
      ...state,
      playbook: {
        ...state.playbook,
        doc: {
          ...playbook.doc,
          [slide_number]: {
            ...playbook.doc[slide_number],
            ...action.data
          }
        }
      }
    };

  case 'TOGGLE_OPEN_CARD':
    const { openCards } = state;
    const isInArray = openCards.indexOf(action.cardID);

    if (isInArray > -1) {
      return {
        ...state,
        openCards: [
          ...openCards.slice(0, isInArray),
          ...openCards.slice(isInArray + 1)
        ]
      };
    }

    return {
      ...state,
      openCards: [...openCards].concat(action.cardID)
    };

  case 'PLAYBOOK_SENT':
    return {
      ...state,
      message: action.message
    };

  default:
    return state;
  }
}
