import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import editableMap from './index.jsx';
const wrapper = shallow(<editableMap/>);

test('editableMap does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
