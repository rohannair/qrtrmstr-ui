import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import ForgotPasswordModal from './index.jsx';
const wrapper = shallow(<ForgotPasswordModal closeModal={() => {}}/>);

test('ForgotPasswordModal does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
