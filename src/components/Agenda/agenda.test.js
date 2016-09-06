// Testing Button
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import Agenda from './index.jsx';
const wrapper = shallow(<Agenda/>);

test('Agenda does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
