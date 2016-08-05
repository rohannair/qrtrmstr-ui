// Testing TextBox
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import TextBox from './index.jsx';
const wrapper = shallow(<TextBox/>);

test('TextBox does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
