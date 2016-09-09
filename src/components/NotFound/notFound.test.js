import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import NotFound from './index.jsx';
const wrapper = shallow(<NotFound onClose={() => {}} onAction={() => {}}/>);

test('NotFound does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
