// Testing SlideKnowledgeCenterLink
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import SlideKnowledgeCenterLink from './index.jsx';
const wrapper = shallow(<SlideKnowledgeCenterLink deleteItem={() => {}}/>);

test('SlideKnowledgeCenterLink does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
