// Testing EditPlaybookModal
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import EditPlaybookModal from './index.jsx';
const wrapper = shallow(<EditPlaybookModal/>);

test('EditPlaybookModal does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
