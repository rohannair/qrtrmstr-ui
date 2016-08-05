// Testing PlaybookCardFooter
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import PlaybookCardFooter from './index.jsx';
const wrapper = shallow(<PlaybookCardFooter/>);

test('PlaybookCardFooter does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
