const initialState = {
  surveys: {},
};

export default function surveyView(state = initialState, action) {
  switch (action.type) {
  case 'SURVEYS_RETRIEVED':
    return {
      ...state,
      surveys: action.surveys
    };
  default:
    return state;
  }
}
