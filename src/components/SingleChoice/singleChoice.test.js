// Testing SingleChoice
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import SingleChoice from './index.jsx';
const wrapper = shallow(<SingleChoice/>);

test('SingleChoice does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
