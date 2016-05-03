import { find } from 'lodash';

const defaultState = {
  survey: {},
  selected: {}
};

export default function survey(state = defaultState, action) {
  const { id } = action;
  switch (action.type) {

  case 'SURVEY_RETRIEVED':
    return {
      ...state,
      survey: action.survey.doc
    };

  case 'SURVEY_SELECTION':
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
