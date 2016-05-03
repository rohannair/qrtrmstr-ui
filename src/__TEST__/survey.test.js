import test from 'tape';

// Reducer
import survey from '../reducers/survey';

test('Survey', next => {

  next.test('SURVEY_RETRIEVED', t => {

    const action = {
      type: 'SURVEY_RETRIEVED',
      survey: {
        doc: {
          foo: 'bar'
        }
      },
      selected: 'blabla'
    };

    const state = {
      baz: 'qux',
      selected: {
        obj: 'nonono'
      }
    };

    const state_after = {
      baz: 'qux',
      survey: {
        foo: 'bar'
      },
      selected: {
        obj: 'nonono'
      }
    };

    t.plan(1);
    t.deepEqual(
      survey(state, action),
      state_after,
      'Add survey object to state on retrieval'
    );
    t.end();
  });

  next.test('SURVEY_SELECTION', t => {
    const action = {
      type: 'SURVEY_SELECTION',
      id: {
        key: 'foo',
        val: 'bar'
      }
    };

    const state = {};
    const state_after = {
      selected: {
        foo: 'bar'
      }
    };

    t.plan(1);
    t.deepEqual(
      survey(state, action),
      state_after,
      'Add selected object to state on selection within survey'
    );
    t.end();
  });
});
