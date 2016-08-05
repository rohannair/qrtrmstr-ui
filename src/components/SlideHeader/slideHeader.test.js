// Testing SlideHeader
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import SlideHeader from './index.jsx';
const wrapper = shallow(<SlideHeader/>);

test('SlideHeader does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
