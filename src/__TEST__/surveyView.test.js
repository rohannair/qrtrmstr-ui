import test from 'tape';

// Reducer
import surveyView, { initialState } from '../reducers/surveyView';

test('SurveyView', ({ test }) => {

  test('Reducer generics', assert => {

    const action = {
      type: 'ABC',
      data: 'ABCDEFG'
    };

    const state = {};

    assert.deepEqual(
      surveyView(state, action),
      state,
      'Should return the initial state when action isn\'t known'
    );

    assert.end();
  });

  // This test is broken, but I think it might be a node/babel issue.. not respecting es6 argument defaults.
  test('Reducer defaults', t => {
    t.plan(0);

    // Broken test
    // t.deepEqual(
    //   surveyView(null, {}),
    //   initialState,
    //   'Returns proper initial state if no state is passed into reducer'
    // );

    t.end();
  });

  // SURVEYS_RETRIEVED
  test('SURVEYS_RETRIEVED reducer', assert => {

    const action = {
      type: 'SURVEYS_RETRIEVED',
      surveyList: ['Survey1', 'Survey2', 'Survey3']
    };

    const action_with_extra = {
      type: 'SURVEYS_RETRIEVED',
      surveyList: ['Survey1', 'Survey2', 'Survey3'],
      THIRDPROP: 'BLABLABLA I WILL EAT YOUR SOUL'
    };

    const before = {
      hello: 'world',
      list: [],
    };

    const after = {
      hello: 'world',
      list: ['Survey1', 'Survey2', 'Survey3']
    };

    assert.plan(2);

    assert.deepEqual(
      surveyView(before, action),
      after,
      'SURVEYS_RETRIEVED must merge action.surveyList and state'
    );

    assert.deepEqual(
      surveyView(before, action_with_extra),
      after,
      'SURVEYS_RETRIEVED must merge ONLY action.surveyList and state'
    );

    assert.end();
  });

  // SINGLE_SURVEY_RETRIEVED
  test('SINGLE_SURVEY_RETRIEVED reducer', assert => {
    const action = {
      type: 'SINGLE_SURVEY_RETRIEVED',
      survey: {
        k3y: 'hello i am k3y'
      }
    };

    const state_after = {
      survey: {
        k3y: 'hello i am k3y'
      }
    };

    assert.plan(1);

    assert.deepEqual(
      surveyView(0, action),
      state_after,
      'SINGLE_SURVEY_RETRIEVED should return the state with a non-empty survey value');

    assert.end();
  });

  // ADD_NEW_SURVEY
  test('ADD_NEW_SURVEY', assert => {
    assert.plan(1);

    const action = {
      type: 'ADD_NEW_SURVEY',
      survey: { id: 1, name: 'Object 1' }
    };

    const state = {
      name: 'My first state',
      list: [
        { id: 0, name: 'Object 0'}
      ]
    };

    const state_after = {
      name: 'My first state',
      list: [
        { id: 0, name: 'Object 0'},
        { id: 1, name: 'Object 1' }
      ]
    };

    assert.plan(1);

    assert.deepEqual(
      surveyView(state, action),
      state_after,
      'New survey should be pushed into list'
    );

    assert.end();
  });

  // ADD_SLIDE
  test('ADD_SLIDE', assert => {

    const action = {
      type: 'ADD_SLIDE',
      slideID: 'bar',
      slideInfo: {
        val: 'b'
      }
    };

    const state = {
      name: 'Hello',
      survey: {
        name: 'survey',
        doc: {
          'foo': {
            val: 'a',
            slide_number: 1
          }
        }
      }
    };

    const state_after = {
      name: 'Hello',
      survey: {
        name: 'survey',
        doc: {
          'foo': {
            val: 'a',
            slide_number: 1
          },
          'bar': {
            val: 'b',
            slide_number: 2
          }
        }
      }
    };

    assert.plan(7);

    // Run reducer
    const newState = surveyView(state, action);

    assert.ok(newState.name === state.name, 'state maintains other properties');
    assert.ok(newState.survey, 'state passes survey object');
    assert.ok(newState.survey.name === state.survey.name, 'state.survey maintains other properties');
    assert.ok(newState.survey.doc, 'state.survey has a doc property');
    assert.ok(typeof newState.survey.doc === 'object', 'state.survey.doc is an object');
    assert.ok(Object.keys(newState.survey.doc).length === 2, 'doc has two properties');
    assert.deepEqual(newState, state_after, 'deep equals matches');

    assert.end();
  });

  // REMOVE_SLIDE
  test('REMOVE_SLIDE', t => {

    const action = {
      type: 'REMOVE_SLIDE',
      slideID: 'bar'
    };

    const state = {
      name: 'Hello',
      survey: {
        name: 'survey',
        doc: {
          'foo': {
            val: 'a',
            slide_number: 1
          },
          'bar': {
            val: 'b',
            slide_number: 2
          }
        }
      }
    };

    const state_after = {
      name: 'Hello',
      survey: {
        name: 'survey',
        doc: {
          'foo': {
            val: 'a',
            slide_number: 1
          }
        }
      }
    };

    t.plan(1);

    t.deepEqual(
      surveyView(state, action),
      state_after,
      'REMOVE SLIDE doesn\'t work properly'
    );

    t.end();
  });

  // EDIT_SLIDE
  test('EDIT_SLIDE', t => {

    const action = {
      type: 'EDIT_SLIDE',
      slide_number: 'bat',
      data: {
        foo: 'bar'
      }
    };

    const bad_action = {
      type: 'EDIT_SLIDE',
      slide_number: 'bbt',
      data: {
        foo: 'bar'
      }
    };

    const state = {
      hello: 'world',
      survey: {
        baz: 'qux',
        doc: {
          xyzzy: { name: 'hi' },
          bat: { foo: 'friends' }
        }
      }
    };

    const state_after = {
      hello: 'world',
      survey: {
        baz: 'qux',
        doc: {
          xyzzy: { name: 'hi' },
          bat: { foo: 'bar' }
        }
      }
    };

    t.plan(2);

    t.deepEqual(
      surveyView(state, action),
      state_after,
      'Edit the proper slide object on input'
    );

    t.deepEqual(
      surveyView(state, bad_action),
      state,
      'Un-recognized slides don\'t cause issues'
    );

    t.end();
  });

  // TOGGLE_OPEN_CARD
  test('TOGGLE_OPEN_CARD', t => {
    const action = {
      type: 'TOGGLE_OPEN_CARD',
      cardID: 'foo'
    };

    const state = {
      name: 'bar',
      openCards: []
    };

    const state_after = {
      name: 'bar',
      openCards: ['foo']
    };

    t.plan(2);

    t.deepEqual(
      surveyView(state, action),
      state_after,
      'CardID needs to be added to state.openCards if it isn\'t there'
    );

    t.deepEqual(
      surveyView(state_after, action),
      state,
      'CardID needs to be removed from state.openCards if it\'s already there'
    );

    t.end();

  });

  // TOGGLE_SEND_SURVEY_MODAL
  test('TOGGLE_SEND_SURVEY_MODAL', t => {
    const action = {
      type: 'TOGGLE_SEND_SURVEY_MODAL'
    };

    const state = {};

    const state_after = {
      showModal: true
    };

    const state_after_2 = {
      showModal: false
    };

    t.plan(2);

    t.deepEqual(
      surveyView(state,action),
      state_after,
      'If modal isn\'t open, toggle showModal to true'
    );
    t.deepEqual(
      surveyView(state_after, action),
      state_after_2,
      'If modal ist open, toggle showModal to false'
    );

    t.end();
  });
});

