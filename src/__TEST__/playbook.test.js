import test from 'tape';

// Reducer
import playbook from '../reducers/playbook';

test('Playbook', next => {

  next.test('PLAYBOOK_RETRIEVED', t => {

    const action = {
      type: 'PLAYBOOK_RETRIEVED',
      playbook: {
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
      completePlaybook: {
        doc: {
          foo: 'bar'
        }
      },
      playbook: {
        foo: 'bar'
      },
      selected: {
        obj: 'nonono'
      },
      submittedPlaybook: undefined
    };

    t.plan(1);
    t.deepEqual(
      playbook(state, action),
      state_after,
      'Add playbook object to state on retrieval'
    );
    t.end();
  });

  next.test('PLAYBOOK_SELECTION', t => {
    const action = {
      type: 'PLAYBOOK_SELECTION',
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
      playbook(state, action),
      state_after,
      'Add selected object to state on selection within playbook'
    );
    t.end();
  });
});
