import { createStore } from 'redux';
import expect from 'expect'
import test from 'tape';

//Reducer
import surveyView from '../reducers/surveyView';

const store = createStore(surveyView);

console.log('Initial state:');
console.log(store.getState());
console.log('---------------');

test('SurveyView', next => {

  next.test('Return Current State When No Case Matches', assert => {

    const actionDefault = {
      type: 'DEFAULT'
    };

    const surveyViewDefaultBefore = {
      list: [],
      survey: {},
      openCards: []
    };

    const surveyViewDefaultAfter = {
      list: [],
      survey: {},
      openCards: []
    };

    const surveyViewDefaultWithAction = surveyView(surveyViewDefaultBefore, actionDefault);

    assert.ok(surveyViewDefaultWithAction, surveyViewDefaultAfter, 'Should Return The Initial (Default) State');
    assert.end();
  });

  next.test('SURVEYS_RETRIEVED', assert => {

    const actionSurveysRetrieved = {
      type: 'SURVEYS_RETRIEVED',
      survey: {},
      openCards: [],
      surveyList: ["Survey1", "Survey2", "Survey3"] 
    };

    const surveyViewSurveysRetrievedBefore = {
      list: [],
      survey: {},
      openCards: []
    };

    const surveyViewSurveysRetrievedAfter = {
      survey: {},
      openCards: [],
      list: ["Survey1", "Survey2", "Survey3"]
    };

    const surveyViewSurveysRetrievedAction = surveyView(surveyViewSurveysRetrievedBefore, actionSurveysRetrieved);

    assert.ok(surveyViewSurveysRetrievedAction, surveyViewSurveysRetrievedAfter, 'SURVEYS_RETRIEVED Should Return The State With A Non-Empty list Value');
    assert.end();
  });

  next.test('SINGLE_SURVEY_RETRIEVED', assert => {

    const surveyVal = {
      doc: {
        text1: {
          slide_number: 0, 
          type:"text", 
          heading: "Introduction", 
          body: "<h2>Hi Rachel, congratulations (...)"
        }
      }
    };

    const actionSingleSurveyRetrieved = {
      type: 'SINGLE_SURVEY_RETRIEVED',
      survey: surveyVal,
      openCards: [],
      surveyList: [] 
    };

    const surveyViewSingleSurveyRetrievedBefore = {
      list: [],
      survey: {},
      openCards: []
    };

    const surveyViewSingleSurveyRetrievedAfter = {
      openCards: [],
      list: [],
      survey: surveyVal
    };

    const surveyViewSingleSurveyRetrievedAction = surveyView(surveyViewSingleSurveyRetrievedBefore, actionSingleSurveyRetrieved);

    assert.ok(surveyViewSingleSurveyRetrievedAction, surveyViewSingleSurveyRetrievedAfter, 'SINGLE_SURVEY_RETRIEVED Should Return The State With A Non-Empty Survey Value');
    assert.end();
  });

  next.test('ADD_SLIDE', assert => {

    const surveyVal = {
      doc: {
        text1: {
          slide_number: 0, 
          type:"text", 
          heading: "Introduction", 
          body: "<h2>Hi Rachel, congratulations (...)"
        }
      }
    };

    const surveyValAfter = {
      doc: {
        text1: {
          slide_number: 0, 
          type:"text", 
          heading: "Introduction", 
          body: "<h2>Hi Rachel, congratulations (...)"
        },
        newSlide: {
          type: "text", 
          heading: "Introduction", 
          body: "<h2>Hi Rachel, congratulations (...)",
          slide_number: 1
        }
      }
    };

    const actionAddSlide = {
      type: 'ADD_SLIDE',
      slideID: "newSlide",
      slideInfo: {
        type: "text", 
        heading: "Introduction", 
        body: "<h2>Hi Rachel, congratulations (...)" 
      }
    };

    const surveyViewAddSlideBefore = {
      list: [],
      survey: surveyVal,
      openCards: []
    };

    const surveyViewAddSlideAfter = {
      openCards: [],
      list: [],
      survey: surveyValAfter
    };

    const surveyViewAddSlideAction = surveyView(surveyViewAddSlideBefore, actionAddSlide);

    assert.ok(surveyViewAddSlideAction, surveyViewAddSlideAfter, 'ADD_SLIDE Should Return The State With An Updated Survey Value');
    assert.end();
  });
  next.test('REMOVE_SLIDE', assert => {

    const surveyValRem = {
      doc: {
        text1: {
          slide_number: 0, 
          type:"text", 
          heading: "Introduction", 
          body: "<h2>Hi Rachel, congratulations (...)"
        },
        newSlide: {
          type: "text", 
          heading: "Introduction", 
          body: "<h2>Hi Rachel, congratulations (...)",
          slide_number: 1
        }
      }
    };

    const surveyValRemAfterP1 = {
      doc: {
        text1: {
          slide_number: 0, 
          type:"text", 
          heading: "Introduction", 
          body: "<h2>Hi Rachel, congratulations (...)"
        }
      }
    };

    const surveyValRemAfterP2 = {
      doc: {
        text1: {
          slide_number: 0, 
          type:"text", 
          heading: "Introduction", 
          body: "<h2>Hi Rachel, congratulations (...)"
        },
        newSlide: {
          type: "text", 
          heading: "Introduction", 
          body: "<h2>Hi Rachel, congratulations (...)",
          slide_number: 1
        }
      }
    };

    const actionRemoveSlideP1 = {
      type: 'REMOVE_SLIDE',
      slideID: "newSlide"
    };

    const actionRemoveSlideP2 = {
      type: 'REMOVE_SLIDE',
      slideID: "notValidSlide"
    };

    const surveyViewRemoveSlideBefore = {
      list: [],
      survey: surveyValRem,
      openCards: []
    };

    const surveyViewRemoveSlideAfterP1 = {
      openCards: [],
      list: [],
      survey: surveyValRemAfterP1
    };

    const surveyViewRemoveSlideAfterP2 = {
      openCards: [],
      list: [],
      survey: surveyValRemAfterP2
    };

    const surveyViewRemoveSlideActionP1 = surveyView(surveyViewRemoveSlideBefore, actionRemoveSlideP1);
    const surveyViewRemoveSlideActionP2 = surveyView(surveyViewRemoveSlideBefore, actionRemoveSlideP2);

    assert.ok(surveyViewRemoveSlideActionP1, surveyViewRemoveSlideAfterP1, 'REMOVE_SLIDE Should Return The State With The Given Valid slideID Removed');
    assert.ok(surveyViewRemoveSlideActionP2, surveyViewRemoveSlideAfterP2, 'REMOVE_SLIDE Should Return The Current State When Given An Invalid slideID');
    assert.end();
  });

  next.test('EDIT_SLIDE', assert => {

    const surveyValEdit = {
      doc: {
        text1: {
          slide_number: 0, 
          type:"text", 
          heading: "Introduction", 
          body: "<h2>Hi Rachel, congratulations (...)"
        },
        newSlide: {
          type: "text", 
          heading: "Welcome", 
          slide_number: 1
        }
      }
    };

    const surveyValEditAfterP1 = {
      doc: {
        text1: {
          slide_number: 0, 
          type:"text", 
          heading: "Introduction", 
          body: "<h2>Hi Rachel, congratulations (...)"
        },
        newSlide: {
          type: "text", 
          heading: "Introduction", 
          body: "<h2>Hi Rachel, congratulations (...)",
          slide_number: 1
        }
      }
    };

    const surveyValEditAfterP2 = {
      doc: {
        text1: {
          slide_number: 0, 
          type:"text", 
          heading: "Introduction", 
          body: "<h2>Hi Rachel, congratulations (...)"
        },
        newSlide: {
          type: "text", 
          heading: "Welcome", 
          slide_number: 1
        }
      }
    };

    const dataEdit = {
      heading: "Introduction",
      body: "<h2>Hi Rachel, congratulations (...)"
    }

    const actionEditSlideP1 = {
      type: 'EDIT_SLIDE',
      slideID: "newSlide",
      data: dataEdit
    };

    const actionEditSlideP2 = {
      type: 'EDIT_SLIDE',
      slideID: "notValidSlide",
      data: dataEdit
    };

    const surveyViewEditSlideBefore = {
      list: [],
      survey: surveyValEdit,
      openCards: []
    };
    console.log("surveyViewEditSlideBefore")
    console.log(surveyViewEditSlideBefore.survey)

    const surveyViewEditSlideAfterP1 = {
      openCards: [],
      list: [],
      survey: surveyValEditAfterP1
    };

    const surveyViewEditSlideAfterP2 = {
      openCards: [],
      list: [],
      survey: surveyValEditAfterP2
    };

    const surveyViewEditSlideActionP1 = surveyView(surveyViewEditSlideBefore, actionEditSlideP1);
    const surveyViewEditSlideActionP2 = surveyView(surveyViewEditSlideBefore, actionEditSlideP2);

    assert.ok(surveyViewEditSlideActionP1, surveyViewEditSlideAfterP1, 'EDIT_SLIDE Should Return The State With The Given Valid slideID Updated');
    assert.ok(surveyViewEditSlideActionP2, surveyViewEditSlideAfterP2, 'EDIT_SLIDE Should Return The Current State When Given An Invalid slideID');

    assert.end();
  });

  next.test('TOGGLE_OPEN_CARD', assert => {

    const surveyVal = [1, 2, 3];
    const surveyValAfterP1 = [1, 2, 3, 4];
    const surveyValAfterP2 = [1, 2, 4];
    
    const actionToggleOpenCardP1 = {
      type: 'TOGGLE_OPEN_CARD',
      cardID: 4
    };

    const actionToggleOpenCardP2 = {
      type: 'TOGGLE_OPEN_CARD',
      cardID: 3
    };

    const surveyViewToggleOpenCardBefore = {
      list: [],
      survey: {},
      openCards: surveyVal
    };

    const surveyViewToggleOpenCardAfterP1 = {
      list: [],
      survey: {},
      openCards: surveyValAfterP1
    };

    const surveyViewToggleOpenCardAfterP2 = {
      list: [],
      survey: {},
      openCards: surveyValAfterP2
    };

    const surveyViewToggleOpenCardActionP1 = surveyView(surveyViewToggleOpenCardBefore, actionToggleOpenCardP1);
    const surveyViewToggleOpenCardActionP2 = surveyView(surveyViewToggleOpenCardBefore, actionToggleOpenCardP2);

    assert.ok(surveyViewToggleOpenCardAfterP1, surveyViewToggleOpenCardActionP1, 'TOGGLE_OPEN_CARD When Given An ID In openCard Array Should Return The State With An openCards Value With The CardID Removed');
    assert.ok(surveyViewToggleOpenCardAfterP2, surveyViewToggleOpenCardActionP2, 'TOGGLE_OPEN_CARD When Given An ID Not In openCard Array Should Return The State With An openCards Value With The CardID Added');
    assert.end();
  });
});
  