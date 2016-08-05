// Testing ChecklistEditor
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import ChecklistEditor from './index.jsx';
const wrapper = shallow(<ChecklistEditor/>);

test('ChecklistEditor does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
