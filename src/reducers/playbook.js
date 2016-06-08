import { find } from 'lodash';

const defaultState = {
  playbook: {},
  selected: {},
  submittedPlaybook: {}
};

export default function playbook(state = defaultState, action) {
  const { id } = action;
  switch (action.type) {

  case 'PLAYBOOK_RETRIEVED':
    return {
      ...state,
      playbook: action.playbook.doc,
      submittedPlaybook: action.playbook.submitted_doc
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
    const { submittedPlaybook } = state;

    return {
      ...state,
      submittedPlaybook: {
        ...submittedPlaybook,
        [slideKey]: data
      }
    };

  case 'PLAYBOOK_SUBMITTED':
    const { playbook } = action;

    return {
      ...state,
      submittedPlaybook: playbook.submitted_doc
    };

  default:
    return state;
  }
}
