import _ from 'lodash';

const initialState = {
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
      survey: action.survey[0]
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
    const { slideId, data } = action;

    const editKey = action.slideID;
    const orgDoc = state.survey.doc;
    const slideKeys = orgDoc[slideId];

    if (slideId in orgDoc) {
      const newData = data;

      const editDoc = {
        ...orgDoc,
        [slideId]: {
          ...slideKeys,
          ...action.data
        }
      };

      const editedState = {
        ...state,
        survey: {
          ...state.survey,
          doc: editDoc
        }
      };

      return editedState;
    };

    return state;

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
