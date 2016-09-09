// Testing Modal
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import Modal from './index.jsx';
const wrapper = shallow(<Modal onClose={() => {}}/>);

test('Modal does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
