// Testing SlideIntro
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import SlideIntro from './index.jsx';
const wrapper = shallow(<SlideIntro/>);

test('SlideIntro does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
