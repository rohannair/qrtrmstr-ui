// Testing SlideFirstDay
import 'jsdom-global/register'
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import SlideFirstDay from './index.jsx';

test.skip('SlideFirstDay does not explode', t => {
  const wrapper = shallow(<SlideFirstDay/>);
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
