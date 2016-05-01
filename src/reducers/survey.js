import { default as stateMock } from '../../mocks/surveyMock';
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
      survey: action.survey.doc,
      ...state
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
