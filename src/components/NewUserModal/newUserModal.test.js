// Testing NewUserModal
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import NewUserModal from './index.jsx';
const wrapper = shallow(<NewUserModal/>);

test('NewUserModal does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
