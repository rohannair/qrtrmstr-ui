import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import SendPlaybookModal from './index.js';

test.skip('SendPlaybookModal does not explode', t => {
  const wrapper = shallow(<SendPlaybookModal />);
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
