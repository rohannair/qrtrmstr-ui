import { createStore } from 'redux';
import test from 'tape';

// Reducer
import app from '../reducers/app';

const store = createStore(app);

console.log('Initial state:');
console.log(store.getState());
console.log('---------------');

test('App reducer', next => {

  next.test('Defaults', t => {

    const action = {
      type: 'BLABLA',
      users: 'abc'
    };

    const state = {
      users: []
    };

    t.plan(2);

    t.ok(Array.isArray(state.users), 'Users property is an array');
    t.deepEqual(app(state, action), state, 'No mutation if action type is unrecognized');

    t.end();

  });

  next.test('USERS_RETRIEVED', t => {

    const action = {
      type: 'USERS_RETRIEVED',
      users: ['foo', 'bar']
    };

    const state = {};

    const new_state = {
      users: ['foo', 'bar']
    };

    t.plan(1);
    t.deepEqual(app(state,action), new_state, 'USERS_RETRIEVED should return the state with a non-empty users value');
    t.end();
  });

  next.test('TOGGLE_NEW_USER_MODAL', t => {

    const action = {
      type: 'TOGGLE_NEW_USER_MODAL'
    };

    const state = {};
    const state_after = { showModal: true };
    const state_after_2 = { showModal: false };

    t.plan(2);

    t.deepEqual(app(state, action), state_after, 'Open modal');
    t.deepEqual(app(state_after, action), state_after_2, 'Close modal');

    t.end();
  });

  next.test('NEW_USER_CREATED', t => {
    const action = {
      type: 'NEW_USER_CREATED',
      new_user: 'Rohan'
    };

    const state = {
      users: [
        'Kobe'
      ]
    };

    const state_after = {
      users: ['Kobe', 'Rohan']
    };

    t.plan(1);
    t.deepEqual(app(state, action), state_after, 'Insert new user');
    t.end();

  });

});

