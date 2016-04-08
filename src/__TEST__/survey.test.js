import { createStore } from 'redux';
import expect from 'expect'
import test from 'tape';

//Reducer
import survey from '../reducers/survey';

const store = createStore(survey)

console.log('Initial state:');
console.log(store.getState());
console.log('---------------');

test('Survey', next => {

  next.test('Return Current State When No Case Matches', assert => {

    const actionDefault = {
      type: 'DEFAULT'
    };

    const surveyDefaultBefore = {
      survey: {},
      selected: {}
    };

    const surveyDefaultAfter = {
      survey: {},
      selected: {}
    };

    const surveyDefaultWithAction = survey(surveyDefaultBefore, actionDefault)

    assert.ok(surveyDefaultWithAction, surveyDefaultAfter, 'Should Return The Initial (Default) State')
    assert.end();

  });



  next.test('SURVEY_RETRIEVED', assert => {

    const selected = {};

    const surveyVal = {
      doc: {
        text1: {
          slide_number: 0, 
          type:"text", 
          heading: "Introduction", 
          body: "<h2>Hi Rachel, congratulations (...)"
        }
      }
    }

    const actionSurveyRetrieved = {
      type: 'SURVEY_RETRIEVED',
      survey: surveyVal
    };


    const surveySurveyRetrievedBefore = {
      survey: {},
      selected: {}
    };
    const surveySurveyRetrievedAfter = {
      survey: surveyVal,
      selected: {}
    };
    const surveySurveyRetrievedAction = survey(surveySurveyRetrievedBefore, actionSurveyRetrieved)

    assert.ok(surveySurveyRetrievedAction, surveySurveyRetrievedAfter, 'SURVEY_RETRIEVED Should Return The State With A Non-Empty Survey Value')
    assert.end();
  });

  next.test('SURVEY_SELECTION', assert => {

    const selected = "1e9eddbc-7ede-43fd-9bde-364bba4d84e9";

    const actionSurveySelection = {
      type: 'SURVEY_SELECTION',
      id: selected
    };


    const surveySurveySelectionBefore = {
      survey: {},
      selected: {}
    };
    const surveySurveySelectionAfter = {
      survey: {},
      selected: selected
    };
    const surveySurveySelectionAction = survey(surveySurveySelectionBefore, actionSurveySelection)

    assert.ok(surveySurveySelectionAction, surveySurveySelectionAfter, 'SURVEY_SELECTION Should Return The State With A Non-Empty Selected Value')
    assert.end();
  });
});
  