import _ from 'lodash';

const initialState = {
  showModal: false,
  chosenUser: {},
  list: [],
  survey: {},
  openCards: []
};

export default function surveyView(state = initialState, action) {

  switch (action.type) {
  case 'SURVEYS_RETRIEVED':
    return {
      ...state,
      list: action.surveyList
    };

  case 'SINGLE_SURVEY_RETRIEVED':
    return {
      ...state,
      survey: action.survey
    };

  case 'ADD_SLIDE':
    const doc = {
      ...state.survey.doc,
      [action.slideID]: {
        ...action.slideInfo,
        slide_number: Object.keys(state.survey.doc).length
      }
    };

    return {
      ...state,
      survey: {
        ...state.survey,
        doc
      }
    };

  case 'REMOVE_SLIDE':
    return {
      ...state,
      survey: {
        ...state.survey,
        doc: _.omit(state.survey.doc, [action.slideID])
      }
    };

  case 'EDIT_SLIDE':
    const { slide_number, data } = action;
    const { survey } = state;

    // If slide doesn't exist (which is weird...)
    if (!slide_number in survey.doc) return state;

    let newState = {
      ...state,
      survey: {
        ...state.survey,
        doc: {
          ...survey.doc,
          [slide_number]: {
            ...survey.doc[slide_number],
            ...action.data
          }
        }
      }
    };

    return {
      ...state,
      survey: {
        ...state.survey,
        doc: {
          ...survey.doc,
          [slide_number]: {
            ...survey.doc[slide_number],
            ...action.data
          }
        }
      }
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

  case 'TOGGLE_SEND_SURVEY_MODAL':
    return {
      ...state,
      showModal: !state.showModal
    };

  default:
    return state;
  }
}
