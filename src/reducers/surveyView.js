//import { omit } from 'lodash.omit';
//var omit = require('lodash.omit');
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
    const new_doc = _.omit(state.survey.doc, [action.slideID]);
    return {
      ...state,
      survey: {
        ...state.survey,
        doc: new_doc
      }
    };

  case 'EDIT_SLIDE':

    const editKey = action.slideID
    const orgDoc = state.survey.doc
    const slideKeys = orgDoc[editKey]

    const isAKey = editKey in orgDoc;
    
    if (isAKey) {
      const newData = action.data

      const updatedKeys = (originalData) => {
        return Object.assign({}, originalData, newData)
      };

      const edit_doc = {
        ...orgDoc,
        [action.slideID]: updatedKeys(slideKeys)
      };

      const edited_state = {
        ...state,
        survey: {
          ...state.survey,
          doc: edit_doc
        }
      };
      return edited_state
    
    };
    return state


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
