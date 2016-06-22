import test from 'tape';

// Reducer
import app from '../reducers/app';

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
      users: {
        results: ['foo', 'bar'],
        total: 10
      }
    };

    const state = {};

    const new_state = {
      users: {
        results: ['foo', 'bar'],
        total: 10
      }
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

    t.plan(0);

    // t.deepEqual(app(state, action), state_after, 'Open modal');
    // t.deepEqual(app(state_after, action), state_after_2, 'Close modal');

    t.end();
  });

  next.test('NEW_USER_CREATED', t => {
    const action = {
      type: 'NEW_USER_CREATED',
      new_user: 'Rohan'
    };

    const state = {
      users: {
        results: [ 'Kobe' ],
        total: 20
      }
    };

    const state_after = {
      errorMessage: null,
      users: {
        results: ['Kobe', 'Rohan'],
        total: 21
      }
    };

    t.plan(2);
    t.ok(app(state, action).users.total === state_after.users.total, 'Add new user to total');
    t.deepEqual(app(state, action).users.results, state_after.users.results, 'Insert new user');
    t.end();

  });

});
