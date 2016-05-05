import { find } from 'lodash';

const defaultState = {
  playbook: {},
  selected: {}
};

export default function playbook(state = defaultState, action) {
  const { id } = action;
  switch (action.type) {

  case 'PLAYBOOK_RETRIEVED':
    return {
      ...state,
      playbook: action.playbook.doc
    };

  case 'PLAYBOOK_SELECTION':
    return {
      ...state,
      selected: {
        ...state.selected,
        [id.key]: id.val
      }
    };

  default:
    return state;
  }
}
