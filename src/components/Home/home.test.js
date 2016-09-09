import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import Home from './index.jsx';
const wrapper = shallow(<Home onClose={() => {}} onAction={() => {}}/>);

test('Home does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
