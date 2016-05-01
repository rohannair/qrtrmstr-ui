import test from 'tape';

// Reducer
import accountActions from '../reducers/login';

test('AccountActions', t => {
  t.plan(3);

  t.deepEqual(
    accountActions({}, { type: 'LOG_IN', token: 'ABC123'}),
    { token: 'ABC123' },
    'Set the token'
  );

  t.deepEqual(
    accountActions({ foo: 'bar' }, { type: 'LOG_IN', token: 'ABC123'}),
    { foo: 'bar', token: 'ABC123' },
    'If state existed before login, maintain it'
  );

  t.deepEqual(
    accountActions(
      {
        token: 'ABC123',
        state: 'HELLO I AM STATE',
        extra: { name: 'HELLO I AM EXTRA'}
      }, {
        type: 'LOG_OUT', token: 'ABC123'
      }
    ),
    { token: null },
    'Null the token on logout and kill the state'
  );

  t.end();
});
