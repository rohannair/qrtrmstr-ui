// Testing PlaybookCards
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import PlaybookCards from './index.jsx';
const wrapper = shallow(<PlaybookCards/>);

test('PlaybookCards does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
