import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import PlaybookEditorSidebar from './index.jsx';
const wrapper = shallow(<PlaybookEditorSidebar onClose={() => {}} save={ () => {} } /> );

test('PlaybookEditorSidebar does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
