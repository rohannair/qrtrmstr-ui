// Testing PlaybookListItem
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import PlaybookListItem from './index.jsx';
const wrapper = shallow(<PlaybookListItem showAssignModal={() => {}} 
                                          showSendModal={() => {}} 
                                          duplicatePlaybook={() => {}} 
                                          showScheduleModal={() => {}} />);

test('PlaybookListItem does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
