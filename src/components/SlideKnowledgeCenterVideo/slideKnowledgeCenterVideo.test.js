// Testing SlideKnowledgeCenterVideo
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import SlideKnowledgeCenterVideo from './index.jsx';
const wrapper = shallow(<SlideKnowledgeCenterVideo deleteItem={() => {}}/>);

test('SlideKnowledgeCenterVideo does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
