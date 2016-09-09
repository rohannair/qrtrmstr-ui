// Testing Button
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import ButtonSave from './index.jsx';
const wrapper = shallow(<ButtonSave/>);

test('ButtonSave does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});