import { default as stateMock } from '../../mocks/surveyMock';
import { find } from 'lodash';

const defaultState = {
  ...stateMock,
  selected: {}
};

export default function survey(state = defaultState, action) {

  const { id } = action;
  switch (action.type) {
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
