// Testing MapContainer
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import MapContainer from './index.jsx';
const wrapper = shallow(<MapContainer/>);

test('MapContainer does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
