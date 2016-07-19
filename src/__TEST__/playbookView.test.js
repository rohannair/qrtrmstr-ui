import test from 'ava';
import {
  ADD_SLIDE,
  REMOVE_SLIDE,
  SAVING_PLAYBOOK,
  PLAYBOOKS_RETRIEVED,
  SINGLE_PLAYBOOK_RETRIEVED,
  EDIT_SLIDE,
  ADD_NEW_PLAYBOOK,
  UPDATE_MESSAGE,
  PLAYBOOK_MODIFIED,
  PLAYBOOK_ORDER_MODIFIED,
} from '../constants';

// Reducer
import playbookView, { initialState } from '../reducers/playbookView';

test('playbookView Reducer generics', t => {
  t.plan(1);

  const action = {
    type: 'ABC',
    data: 'ABCDEFG'
  };

  const state = {};

  t.deepEqual(
    playbookView(state, action),
    state,
    'Should return the initial state when action isn\'t known'
  );
});

// PLAYBOOKS_RETRIEVED
test(PLAYBOOKS_RETRIEVED, t => {

  const action = {
    type: PLAYBOOKS_RETRIEVED,
    playbookList: {
      results: ['Playbook1', 'Playbook2', 'Playbook3'],
      total: 30
    }
  };

  const action_with_extra = {
    type: PLAYBOOKS_RETRIEVED,
    playbookList: {
      results: ['Playbook1', 'Playbook2', 'Playbook3'],
      total: 30
    },
    THIRDPROP: 'BLABLABLA I WILL EAT YOUR SOUL'
  };

  const before = {
    hello: 'world',
    list: {
      results: [],
      total: 0
    }
  };

  const after = {
    hello: 'world',
    list: {
      results: ['Playbook1', 'Playbook2', 'Playbook3'],
      total: 30
    }
  };

  t.plan(2);

  t.deepEqual(
    playbookView(before, action),
    after,
    'PLAYBOOKS_RETRIEVED must merge action.playbookList and state'
  );

  t.deepEqual(
    playbookView(before, action_with_extra),
    after,
    'PLAYBOOKS_RETRIEVED must merge ONLY action.playbookList and state'
  );

});

// SINGLE_PLAYBOOK_RETRIEVED
test(SINGLE_PLAYBOOK_RETRIEVED, t => {
  const action = {
    type: SINGLE_PLAYBOOK_RETRIEVED,
    playbook: {
      k3y: 'hello i am k3y'
    },
    users: [
      {username: 'frank@email.com'}
    ]
  };

  const state_after = {
    playbook: {
      k3y: 'hello i am k3y'
    },
    users: [
      {username: 'frank@email.com'}
    ]
  };

  t.plan(1);

  t.deepEqual(
    playbookView(0, action),
    state_after,
    'SINGLE_PLAYBOOK_RETRIEVED should return the state with a non-empty playbook value'
  );

});

// ADD_NEW_PLAYBOOK
test(ADD_NEW_PLAYBOOK, t => {
  t.plan(2);

  const action = {
    type: ADD_NEW_PLAYBOOK,
    playbook: { id: 1, name: 'Object 1' }
  };

  const state = {
    name: 'My first state',
    list: {
      results: [
        { id: 0, name: 'Object 0'}
      ],
      total: 1
    }
  };

  const state_after = {
    name: 'My first state',
    list: {
      results: [
        { id: 0, name: 'Object 0'},
        { id: 1, name: 'Object 1' }
      ],
      total: 2
    }
  };

  t.plan(2);

  t.truthy(playbookView(state, action).list.total === state_after.list.total, 'Increment playbook total count');

  t.deepEqual(
    playbookView(state, action).list.results,
    state_after.list.results,
    'New playbook should be pushed into list'
  );

});

// ADD_NEW_PLAYBOOK
test(ADD_NEW_PLAYBOOK, t => {
  t.plan(2);

  const firstState = {
    name: 'My first state',
    list: {
      results: [
        { id: 0, name: 'Object 0'}
      ],
      total: 1
    }
  };

  const action = {
    type: ADD_NEW_PLAYBOOK,
    playbook: {
      id: 1,
      name: 'Object 1'
    }
  };

  const finalAction = {
    ...firstState,
    list: {
      results: [
        ...firstState.list.results,
        action.playbook
      ],
      total: 2
    }
  };

  t.deepEqual(playbookView(firstState, action).list.results, finalAction.list.results, 'Add new playbook');
  t.truthy(playbookView(firstState, action).list.total === finalAction.list.total, 'Increment playbook total count');
});

// ADD_SLIDE
test(ADD_SLIDE, t => {

  const action = {
    type: ADD_SLIDE,
    slideID: 'bar',
    slideInfo: {
      val: 'b'
    }
  };

  const state = {
    name: 'Hello',
    playbook: {
      name: 'playbook',
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
    playbook: {
      name: 'playbook',
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

  t.plan(7);

  // Run reducer
  const newState = playbookView(state, action);

  t.truthy(newState.name === state.name, 'state maintains other properties');
  t.truthy(newState.playbook, 'state passes playbook object');
  t.truthy(newState.playbook.name === state.playbook.name, 'state.playbook maintains other properties');
  t.truthy(newState.playbook.doc, 'state.playbook has a doc property');
  t.truthy(typeof newState.playbook.doc === 'object', 'state.playbook.doc is an object');
  t.truthy(Object.keys(newState.playbook.doc).length === 2, 'doc has two properties');
  t.deepEqual(newState, state_after, 'deep equals matches');

});

// REMOVE_SLIDE
test(REMOVE_SLIDE, t => {

  const action = {
    type: REMOVE_SLIDE,
    slideID: 'bar'
  };

  const state = {
    name: 'Hello',
    playbook: {
      name: 'playbook',
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
    playbook: {
      name: 'playbook',
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
    playbookView(state, action),
    state_after,
    'REMOVE SLIDE doesn\'t work properly'
  );


});

// EDIT_SLIDE
test(EDIT_SLIDE, t => {

  const action = {
    type: EDIT_SLIDE,
    slide_number: 'bat',
    data: {
      foo: 'bar'
    }
  };

  const bad_action = {
    type: EDIT_SLIDE,
    slide_number: 'bbt',
    data: {
      foo: 'bar'
    },
    saveStatus: 'SAVED'
  };

  const state = {
    hello: 'world',
    playbook: {
      baz: 'qux',
      doc: {
        xyzzy: { name: 'hi' },
        bat: { foo: 'friends' }
      }
    }
  };

  const state_after = {
    hello: 'world',
    playbook: {
      baz: 'qux',
      doc: {
        xyzzy: { name: 'hi' },
        bat: { foo: 'bar' }
      }
    },
    saveStatus: 'UNSAVED'
  };

  t.plan(2);

  t.deepEqual(
    playbookView(state, action),
    state_after,
    'Edit the proper slide object on input'
  );

  t.deepEqual(
    playbookView(state, bad_action),
    state,
    'Un-recognized slides don\'t cause issues'
  );


});

// SAVING_PLAYBOOK
test(SAVING_PLAYBOOK, t=> {
  const action = {
    type: SAVING_PLAYBOOK
  };

  const state = {
    name: 'foo'
  };

  const state_after = {
    name: 'foo',
    saveStatus: 'SAVING'
  };

  t.plan(1);

  t.deepEqual(
    playbookView(state, action),
    state_after,
    'On card save, it should first go to a saving action'
  );
});

// PLAYBOOK_MODIFIED 1
test(PLAYBOOK_MODIFIED, t => {
  const action = {
    type: PLAYBOOK_MODIFIED,
    newPlaybook: {
      result: {
        id: 2,
        name: 'foo'
      },
      message: 'this works'
    }
  };

  const state = {
    list: {
      results: [
        {
          id: 1,
          name: 'bar'
        },
        {
          id: 2,
          name: 'baz'
        },
        {
          id: 3,
          name: 'bam'
        }
      ],
      total: 3
    },
    playbook: {
      id: 2,
      name: 'baz'
    }
  };

  const stateAfter = {
    list: {
      results: [
        {
          id: 1,
          name: 'bar'
        },
        {
          id: 2,
          name: 'foo'
        },
        {
          id: 3,
          name: 'bam'
        }
      ],
      total: 3,
    },
    saveStatus: 'SAVED',
    message: 'this works',
    playbook: {
      id: 2,
      name: 'foo'
    }
  };

  t.plan(1);

  t.deepEqual(
    playbookView(state, action),
    stateAfter
  );


});

// PLAYBOOK_MODIFIED 2
test(PLAYBOOK_MODIFIED, t => {
  const action = {
    type: PLAYBOOK_MODIFIED,
    newPlaybook: {
      result: {
        id: 9,
        name: 'foo'
      },
      message: 'this works'
    }
  };

  const state = {
    list: {
      results: [
        {
          id: 1,
          name: 'bar'
        },
        {
          id: 2,
          name: 'baz'
        },
        {
          id: 3,
          name: 'bam'
        }
      ],
      total: 3
    },
    playbook: {
      id: 2,
      name: 'baz'
    }
  };

  const stateAfter = {
    list: {
      results: [
        {
          id: 1,
          name: 'bar'
        },
        {
          id: 2,
          name: 'baz'
        },
        {
          id: 3,
          name: 'bam'
        },
        {
          id: 9,
          name: 'foo'
        }
      ],
      total: 3,
    },
    saveStatus: 'SAVED',
    message: 'this works',
    playbook: {
      id: 9,
      name: 'foo'
    }
  };

  t.plan(1);

  t.deepEqual(
    playbookView(state, action),
    stateAfter
  );


});
