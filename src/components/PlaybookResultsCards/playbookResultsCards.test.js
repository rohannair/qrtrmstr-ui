import 'jsdom-global/register'
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import PlaybookResultsCards from './index.jsx';

test.skip('PlaybookResultsCards does not explode', t => {
  const wrapper = shallow(<PlaybookResultsCards />);
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
