// Testing Button
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import AgendaFooter from './index.jsx';
const wrapper = shallow(<AgendaFooter/>);

test('AgendaFooter does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
