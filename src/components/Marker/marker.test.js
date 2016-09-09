import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import Marker from './index.jsx';
const wrapper = shallow(<Marker />);

test('Marker does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});