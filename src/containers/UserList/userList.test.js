// Testing UserList
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import UserList from './index.jsx';
const wrapper = shallow(<UserList/>);

test('UserList does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
