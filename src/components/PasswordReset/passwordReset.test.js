// Testing PasswordReset
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import PasswordReset from './index.jsx';
const wrapper = shallow(<PasswordReset/>);

test('PasswordReset does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
