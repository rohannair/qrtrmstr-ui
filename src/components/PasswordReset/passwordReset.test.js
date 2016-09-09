// Testing PasswordReset
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import PasswordReset from './index.js';

test('PasswordReset does not explode', t => {
  const wrapper = shallow(<PasswordReset/>);
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
