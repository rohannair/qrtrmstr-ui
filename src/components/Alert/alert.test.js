// Testing Button
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import Alert from './index.jsx';
const wrapper = shallow(<Alert>This is a test</Alert>);

test('Alert does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
