// Testing SlideEquipment
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import SlideEquipment from './index.jsx';
const wrapper = shallow(<SlideEquipment/>);

test('SlideEquipment does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
