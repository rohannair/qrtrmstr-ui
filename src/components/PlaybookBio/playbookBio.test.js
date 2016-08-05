// Testing PlaybookBio
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import PlaybookBio from './index.jsx';
const wrapper = shallow(<PlaybookBio/>);

test('PlaybookBio does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
