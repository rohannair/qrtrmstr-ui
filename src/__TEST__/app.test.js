import { createStore } from 'redux';
import expect from 'expect'
import test from 'tape';

//Reducer
import app from '../reducers/app';

const store = createStore(app)

console.log('Initial state:');
console.log(store.getState());
console.log('---------------');

test('App', next => {

  next.test('Return Current State When No Case Matches', assert => {

    const actionDefault = {
      type: 'DEFAULT'
    };

    const appDefaultBefore = {
      users: {}
    };

    const appDefaultAfter = {
      users: {}
    }

    const appDefaultWithAction = app(appDefaultBefore, actionDefault)

    assert.ok(appDefaultWithAction, appDefaultAfter, 'Should Return The Initial (Default) State')
    assert.end();

  });



  next.test('USERS_RETRIEVED', assert => {

    const users = [
      { id: 1, first_name: "Rohan", last_name: "Nair", email: "r@rohannair.ca", isAdmin: "t" },
      { id: 2, first_name: "Ron", last_name: "Swanson", email: "rs@parks.rec", isAdmin: "f" },
      { id: 3, first_name: "Lesley", last_name: "Knope", email: "lk@parks.rec", isAdmin: "f" }
    ];

    const actionUsersRetrieved = {
      type: 'USERS_RETRIEVED',
      users: users
    };
    const appUsersRetrievedBefore = {
      users: []
    };
    const appUsersRetrievedAfter = {
      users: users
    };
    const appUsersRetrievedAction = app(appUsersRetrievedBefore, actionUsersRetrieved)

    assert.ok(appUsersRetrievedAction, appUsersRetrievedAfter, 'USERS_RETRIEVED Should Return The State With A Non-Empty Users Value')
    assert.end();
  });
});
  