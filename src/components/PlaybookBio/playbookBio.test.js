// Testing PlaybookBio
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import PlaybookBio from './index.jsx';

test.skip('PlaybookBio does not explode', t => {
  const wrapper = shallow(<PlaybookBio/>);
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
