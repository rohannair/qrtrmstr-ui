// Testing InputGroup
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import InputGroup from './index.jsx';
const wrapper = shallow(<InputGroup/>);

test('InputGroup does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
