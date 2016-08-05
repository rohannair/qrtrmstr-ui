// Testing SlideBio
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import SlideBio from './index.jsx';
const wrapper = shallow(<SlideBio/>);

test('SlideBio does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
