import { find } from 'lodash';
import {
  PLAYBOOK_RETRIEVED,
  PLAYBOOK_SELECTED,
  SUBMITTED_PLAYBOOK_UPDATE,
} from '../constants';

const defaultState = {
  selected: {},
  playbook: {}
};

export default function playbook(state = defaultState, action) {
  const { id } = action;
  switch (action.type) {

  case PLAYBOOK_RETRIEVED:
    return {
      ...state,
      playbook: action.playbook
    };

  case PLAYBOOK_SELECTED:
    return {
      ...state,
      selected: {
        ...state.selected,
        [id.key]: id.val
      }
    };

  case SUBMITTED_PLAYBOOK_UPDATE:
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
