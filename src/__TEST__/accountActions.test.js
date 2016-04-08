import { createStore } from 'redux';
import expect from 'expect'
import test from 'tape';

//Reducer
import accountActions from '../reducers/login';

const store = createStore(accountActions)

console.log('Initial state:');
console.log(store.getState());
console.log('---------------');

test('AccountActions', next => {

  next.test('Return Current State When No Case Matches', assert => {

    const actionDefault = {
      type: 'DEFAULT'
    };

    const accountActionsDefaultBefore = {
      token: null
    };

    const accountActionsDefaultAfter = {
      token: null
    }

    const accountActionsDefaultWithAction = accountActions(accountActionsDefaultBefore, actionDefault)

    assert.ok(accountActionsDefaultWithAction, accountActionsDefaultAfter, 'Should Return The Initial (Default) State')
    assert.end();

  })

  next.test('LOG_IN', assert => {

    const actionLogin = {
      type: 'LOG_IN',
      token: 'auth_token'
    };
    const accountActionsloginBefore = {
      token: null
    };
    const accountActionsLoginAfter = {
      token: 'auth_token'
    };
    const accountActionsLoginAction = accountActions(accountActionsloginBefore, actionLogin)


    assert.ok(accountActionsLoginAction, accountActionsLoginAfter, 'LOG_IN Should Return The State With A Non-Null Token Value')
    assert.end();
  });

  next.test('LOG_OUT', assert => {

    const actionLogout = {
      type: 'LOG_OUT',
      token: null
    };
    const accountActionsLogoutBefore = {
      token: 'auth_token'
    };
    const accountActionsLogoutAfter = {
      token: null
    };
    const accountActionsLogoutAction = accountActions(accountActionsLogoutBefore, actionLogout)


    assert.ok(accountActionsLogoutAction, accountActionsLogoutAfter, 'LOG_OUT Should Return The State With A Token Value Of Null')
    assert.end();

  });

});












