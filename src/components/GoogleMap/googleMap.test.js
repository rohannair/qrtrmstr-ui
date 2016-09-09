import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import GoogleMap from './index.jsx';

test.skip('GoogleMap does not explode', t => {
  const wrapper = shallow(<GoogleMap />);
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
