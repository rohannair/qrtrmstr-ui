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
      playbook: {
        doc: {
          foo: 'bar'
        }
      },
      selected: {
        obj: 'nonono'
      }
    };

    t.plan(1);
    t.deepEqual(
      playbook(state, action),
      state_after,
      'Add playbook object to state on retrieval'
    );
    t.end();
  });

  next.test('EDIT_SUBMITTED_PLAYBOOK', t => {

    const action = {
      type: 'EDIT_SUBMITTED_PLAYBOOK',
      slideKey: '1',
      data: {
        body: {
          bio: 'Hello'
        }
      }
    };

    const state = {
      baz: 'qux',
      playbook: {
        doc: {
          foo: 'bar'
        },
        submitted_doc: {
          1: {
            body: {
              bio: ''
            }
          }
        }
      },
      selected: {
        obj: 'nonono'
      }
    };

    const state_after = {
      baz: 'qux',
      playbook: {
        doc: {
          foo: 'bar'
        },
        submitted_doc: {
          1: {
            body: {
              bio: 'Hello'
            }
          }
        }
      },
      selected: {
        obj: 'nonono'
      }
    };

    t.plan(1);
    t.deepEqual(
      playbook(state, action),
      state_after,
      'Edit submitted doc object in state on retrieval'
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
