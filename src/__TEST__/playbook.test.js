import test from 'tape';
import {
  PLAYBOOK_RETRIEVED,
  PLAYBOOK_SELECTED,
  SUBMITTED_PLAYBOOK_UPDATE,
} from '../constants';

// Reducer
import playbook from '../reducers/playbook';

test('Playbook', next => {

  next.test(PLAYBOOK_RETRIEVED, t => {

    const action = {
      type: PLAYBOOK_RETRIEVED,
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

  next.test(SUBMITTED_PLAYBOOK_UPDATE, t => {

    const action = {
      type: SUBMITTED_PLAYBOOK_UPDATE,
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

  next.test(PLAYBOOK_SELECTED, t => {
    const action = {
      type: PLAYBOOK_SELECTED,
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
