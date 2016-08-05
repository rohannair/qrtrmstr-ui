// Testing Button
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import Button from './index.jsx';
const wrapper = shallow(<Button/>);

test('Button does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
