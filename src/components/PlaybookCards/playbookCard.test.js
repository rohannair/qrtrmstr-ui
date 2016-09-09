// Testing PlaybookCards
import 'jsdom-global/register'
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import PlaybookCards from './index.jsx';

test.skip('PlaybookCards does not explode', t => {
  const wrapper = shallow(<PlaybookCards/>);
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
