import test from 'tape';
import {
  USERS_RETRIEVED,
  NEW_USER_CREATED,
  ROLES_RETRIEVED,
  NEW_USER_ERROR_RETRIEVED,
  PASSWORD_RESET,
  PASSWORD_RESET_ERROR
} from '../constants';

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

  next.test(USERS_RETRIEVED, t => {

    const action = {
      type: USERS_RETRIEVED,
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

  next.test(NEW_USER_CREATED, t => {
    const action = {
      type: NEW_USER_CREATED,
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
        results: ['Rohan', 'Kobe'],
        total: 21
      }
    };

    t.plan(2);
    t.ok(app(state, action).users.total === state_after.users.total, 'Add new user to total');
    t.deepEqual(app(state, action).users.results, state_after.users.results, 'Insert new user');
    t.end();
  });

  next.test(PASSWORD_RESET, t => {

    const action = {
      type: PASSWORD_RESET,
      message: 'Password Reset Successful',
      error_msg: null
    };

    const state = {
      message: null,
      errorMessage: null
    };

    const state_after = {
      message: 'Password Reset Successful',
      errorMessage: null
    };

    t.plan(1);
    t.deepEqual(app(state, action), state_after, 'User reset password');
    t.end();
  });


  next.test(PASSWORD_RESET_ERROR, t => {

    const action = {
      type: PASSWORD_RESET_ERROR,
      message: null,
      error_msg: 'Password reset failed'
    };

    const state = {
      message: null,
      errorMessage: null
    };

    const state_after = {
      message: null,
      errorMessage: 'Password reset failed'
    };

    t.plan(1);
    t.deepEqual(app(state, action), state_after, 'User reset password error');
    t.end();
  });

});
