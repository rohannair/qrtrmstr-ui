import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import UserListItem from './index.jsx';
const wrapper = shallow(<UserListItem onClose={() => {}} onAction={() => {}}/>);

test('UserListItem does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
