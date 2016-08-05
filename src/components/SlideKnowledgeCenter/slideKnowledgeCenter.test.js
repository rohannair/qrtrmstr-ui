// Testing SlideKnowledgeCenter
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import SlideKnowledgeCenter from './index.jsx';
const wrapper = shallow(<SlideKnowledgeCenter/>);

test('SlideKnowledgeCenter does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
