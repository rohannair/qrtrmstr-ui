// Testing PlaybookFormCard
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import PlaybookFormCard from './index.jsx';
const wrapper = shallow(<PlaybookFormCard/>);

test('PlaybookFormCard does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
