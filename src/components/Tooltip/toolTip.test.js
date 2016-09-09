import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import ToolTip from './index.jsx';
const wrapper = shallow(<ToolTip onClose={() => {}} onAction={() => {}}/>);

test('ToolTip does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
