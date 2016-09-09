import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import MapWidget from './index.jsx';
const wrapper = shallow(<MapWidget />);

test('MapWidget does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
