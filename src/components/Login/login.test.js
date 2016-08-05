// Testing Login
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import Login from './index.jsx';
const wrapper = shallow(<Login/>);

test('Login does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
