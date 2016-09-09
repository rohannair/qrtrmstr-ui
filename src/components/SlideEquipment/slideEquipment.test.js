// Testing SlideEquipment
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import SlideEquipment from './index.jsx';

test.skip('SlideEquipment does not explode', t => {
  const wrapper = shallow(<SlideEquipment body={{ options: [ { id: 0 } ] }}/>);
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
