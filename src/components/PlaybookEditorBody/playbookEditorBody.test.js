// Testing PlaybookEditorBody
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import PlaybookEditorBody from './index.jsx';
const wrapper = shallow(<PlaybookEditorBody/>);

test('PlaybookEditorBody does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
