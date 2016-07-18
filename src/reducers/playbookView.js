import omit from 'lodash/omit';
import {
  TOGGLE_OPEN_CARD,
  ADD_SLIDE,
  REMOVE_SLIDE,
  SAVING_PLAYBOOK,
  PLAYBOOKS_RETRIEVED,
  SINGLE_PLAYBOOK_RETRIEVED,
  EDIT_SLIDE,
  ADD_NEW_PLAYBOOK,
  UPDATE_MESSAGE,
  PLAYBOOK_MODIFIED,
  PLAYBOOK_ORDER_MODIFIED,
} from '../constants';

export const initialState = {
  chosenUser: {},
  list: { results: [], total: 0 },
  playbook: {},
  openCards: [],
  message: null,
  saveStatus: 'SAVED'
};

export default function playbookView(state = initialState, action) {

  switch (action.type) {
  case PLAYBOOKS_RETRIEVED:
    return {
      ...state,
      list: action.playbookList
    };

  case SINGLE_PLAYBOOK_RETRIEVED:
    return {
      ...state,
      playbook: action.playbook,
      users: action.users
    };

  case ADD_NEW_PLAYBOOK:
    return {
      ...state,
      list: {
        results: [
          ...state.list.results,
          action.playbook
        ],
        total: state.list.total + 1
      }
    };

  case PLAYBOOK_ORDER_MODIFIED:
    const { idx, direction } = action;
    const totalSlideCount = '' + Object.keys(state.playbook.doc).length - 1;

    if ((idx === '0' && direction === 0) || (idx === totalSlideCount && direction === 1)) return state;

    const idx2 = parseInt(direction)
    ? '' + (parseInt(idx) + 1)
    : '' + (parseInt(idx) - 1);

    return {
      ...state,
      playbook: {
        ...state.playbook,
        doc: {
          ...state.playbook.doc,
          [idx]: state.playbook.doc[idx2],
          [idx2]: state.playbook.doc[idx]
        }
      }
    };

  case ADD_SLIDE:
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

  case REMOVE_SLIDE:
    return {
      ...state,
      playbook: {
        ...state.playbook,
        doc: omit(state.playbook.doc, [action.slideID])
      }
    };

  case EDIT_SLIDE:
    const { slide_number, data } = action;
    const { playbook } = state;

    // If slide doesn't exist (which is weird...)
    if (!(slide_number in playbook.doc)) return state;

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
      },
      saveStatus: 'UNSAVED',
    };

  case TOGGLE_OPEN_CARD:
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

  case UPDATE_MESSAGE:
    return {
      ...state,
      message: action.message
    };

  case SAVING_PLAYBOOK:
    return {
      ...state,
      saveStatus: 'SAVING'
    };

  case PLAYBOOK_MODIFIED:
    const { newPlaybook } = action;
    const { list } = state;
    let pos = list.results.length;
    list.results.forEach((val, ind) => {
      if (val.id === newPlaybook.result.id) {
        pos = ind;
      }
    });

    return {
      ...state,
      message: newPlaybook.message,
      saveStatus: 'SAVED',
      list: {
        results: [
          ...list.results.slice(0, pos),
          newPlaybook.result,
          ...list.results.slice(pos + 1)
        ],
        total: list.total
      },
      playbook: newPlaybook.result
    };

  default:
    return state;
  }
}
