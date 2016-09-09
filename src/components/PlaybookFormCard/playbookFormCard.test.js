// Testing PlaybookFormCard
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import PlaybookFormCard from './index.jsx';

test.skip('PlaybookFormCard does not explode', t => {
  const wrapper = shallow(<PlaybookFormCard/>);
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
