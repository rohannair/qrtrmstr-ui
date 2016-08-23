import omit from 'lodash/omit';
import {
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
  PLAYBOOK_ASSIGNMENT_SUCCESS,
  PLAYBOOK_ASSIGNMENT_PENDING,
  PLAYBOOK_UNASSIGNMENT_SUCCESS
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

  const { list } = state;
  const {
    cardID,
    direction,
    data,
    idx,
    message,
    newPlaybook,
    playbook,
    playbookId,
    playbookList,
    slideID,
    slideInfo,
    slide_number,
    type,
    userId
  } = action;

  let pos, updatedPlaybook; // For position

  switch (type) {
  case PLAYBOOKS_RETRIEVED:
    return {
      ...state,
      list: playbookList
    };

  case SINGLE_PLAYBOOK_RETRIEVED:
    return {
      ...state,
      playbook: playbook
    };

  case ADD_NEW_PLAYBOOK:
    return {
      ...state,
      list: {
        results: [
          ...list.results,
          playbook
        ],
        total: list.total + 1
      }
    };

  case PLAYBOOK_ORDER_MODIFIED:
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
    return {
      ...state,
      playbook: {
        ...state.playbook,
        doc: {
          ...state.playbook.doc,
          [slideID]: {
            ...slideInfo,
            slide_number: Object.keys(state.playbook.doc).length + 1
          }
        }
      }
    };

  case REMOVE_SLIDE:
    return {
      ...state,
      playbook: {
        ...state.playbook,
        doc: omit(state.playbook.doc, [slideID])
      }
    };

  case EDIT_SLIDE:
    // If slide doesn't exist (which is weird...)
    if (!(slide_number in state.playbook.doc)) return state;
    return {
      ...state,
      playbook: {
        ...state.playbook,
        doc: {
          ...state.playbook.doc,
          [slide_number]: {
            ...state.playbook.doc[slide_number],
            ...data
          }
        }
      },
      saveStatus: 'UNSAVED',
    };

  case UPDATE_MESSAGE:
    return {
      ...state,
      message: message
    };

  case SAVING_PLAYBOOK:
    return {
      ...state,
      saveStatus: 'SAVING'
    };

  case PLAYBOOK_UNASSIGNMENT_SUCCESS:
    pos = list.results.findIndex(val => val.id === playbookId);
    return {
      ...state,
      list: {
        ...list,
        results: [
          ...list.results.slice(0, pos),
          {
            ...list.results[pos],
            assigned: null
          },
          ...list.results.slice(pos + 1)
        ]
      }
    };

  case PLAYBOOK_ASSIGNMENT_SUCCESS:
    pos = list.results.findIndex(val => val.id === playbookId);

    // TODO: return updated list
    return {
      ...state,
      list: {
        ...list,
        results: [
          ...list.results.slice(0, pos),
          {
            ...list.results[pos],
            assigned: userId
          },
          ...list.results.slice(pos + 1)
        ]
      }
    };

  case PLAYBOOK_MODIFIED:
    pos = list.results.findIndex(val => val.id === newPlaybook.result.id);

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

  case PLAYBOOK_ASSIGNMENT_PENDING:
  default:
    return state;
  }
}
