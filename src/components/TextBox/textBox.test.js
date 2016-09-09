// Testing TextBox
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import TextBox from './index.jsx';

test.skip('TextBox does not explode', t => {
  const wrapper = shallow(<TextBox/>);
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
