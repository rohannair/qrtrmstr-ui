import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import NewRoleModal from './index.jsx';
const wrapper = shallow(<NewRoleModal closeModal={() => {}}/>);

test('NewRoleModal does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
