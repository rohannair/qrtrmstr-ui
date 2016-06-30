import { find } from 'lodash';

const defaultState = {
  selected: {},
  playbook: {},
  message: null
};

export default function playbook(state = defaultState, action) {
  const { id } = action;
  switch (action.type) {

  case 'UPDATE_MESSAGE':
    return {
      ...state,
      message: action.message
    };

  case 'PLAYBOOK_RETRIEVED':
    return {
      ...state,
      playbook: action.playbook
    };

  case 'PLAYBOOK_SELECTION':
    return {
      ...state,
      selected: {
        ...state.selected,
        [id.key]: id.val
      }
    };

  case 'EDIT_SUBMITTED_PLAYBOOK':
    const { slideKey, data } = action;
    const { playbook } = state;

    return {
      ...state,
      playbook: {
        ...playbook,
        submitted_doc: {
          ...playbook.submitted_doc,
          [slideKey]: data
        }
      }
    };

  default:
    return state;
  }
}
