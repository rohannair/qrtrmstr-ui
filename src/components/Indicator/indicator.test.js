// Testing Indicator
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import Indicator from './index.jsx';
const wrapper = shallow(<Indicator/>);

test('Indicator does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
