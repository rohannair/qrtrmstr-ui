import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import SchedulePlaybookModal from './index.js';

test.skip('SchedulePlaybookModal does not explode', t => {
  const wrapper = shallow(<SchedulePlaybookModal />);
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
