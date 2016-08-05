// Testing Playbook
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import Playbook from './index.jsx';
const wrapper = shallow(<Playbook/>);

test('Playbook does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
