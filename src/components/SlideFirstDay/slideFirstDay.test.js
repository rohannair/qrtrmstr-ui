// Testing SlideFirstDay
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import SlideFirstDay from './index.jsx';
const wrapper = shallow(<SlideFirstDay/>);

test('SlideFirstDay does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
