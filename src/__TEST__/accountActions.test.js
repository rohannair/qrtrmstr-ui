import test from 'ava';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  FORGOT_PASSWORD_EMAIL_SENT,
  FORGOT_PASSWORD_ERROR
} from '../constants';

// Reducer
import accountActions from '../reducers/login';

test(LOGIN_SUCCESS, t => {
  t.plan(2);

  t.deepEqual(
    accountActions({}, { type: LOGIN_SUCCESS, token: 'ABC123'}),
    { token: 'ABC123' },
    'Set the token'
  );

  t.deepEqual(
    accountActions({ foo: 'bar' }, { type: LOGIN_SUCCESS, token: 'ABC123'}),
    { foo: 'bar', token: 'ABC123' },
    'If state existed before login, maintain it'
  );
});

test(LOGOUT, t => {
  t.plan(1);

  t.deepEqual(
    accountActions(
      {
        token: 'ABC123',
        state: 'HELLO I AM STATE',
        extra: { name: 'HELLO I AM EXTRA'}
      }, {
        type: LOGOUT, token: 'ABC123'
      }
    ),
    null,
    'Null the token on logout and kill the state'
  );
});

test(FORGOT_PASSWORD_EMAIL_SENT, t => {
  t.plan(1);

  t.deepEqual(
    accountActions(
      {
        message: null,
        state: 'HELLO I AM STATE',
        error: null
      }, {
        type: FORGOT_PASSWORD_EMAIL_SENT, message: 'Email Sent', error: null
      }
    ),
    { message: 'Email Sent', error: null, state: 'HELLO I AM STATE' },
    'Send the forgot password email'
  );
});

test(FORGOT_PASSWORD_ERROR, t => {
  t.plan(1);

  t.deepEqual(
    accountActions(
      {
        message: null,
        state: 'HELLO I AM STATE',
        error: null
      }, {
        type: FORGOT_PASSWORD_ERROR, message: null, error: 'Email failed to send'
      }
    ),
    { message: null, error: 'Email failed to send', state: 'HELLO I AM STATE' },
    'Send the forgot password email error'
  );
});
