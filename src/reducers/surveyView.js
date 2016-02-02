const initialState = {
  surveys: {},
  openCards: []
};

export default function surveyView(state = initialState, action) {

  switch (action.type) {
  case 'SURVEYS_RETRIEVED':
    return {
      ...state,
      surveys: action.surveys
    };

  case 'TOGGLE_OPEN_CARD':
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

  default:
    return state;
  }
}
