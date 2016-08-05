// Testing SlideEquipmentBody
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import SlideEquipmentBody from './index.jsx';
const wrapper = shallow(<SlideEquipmentBody/>);

test('SlideEquipmentBody does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
