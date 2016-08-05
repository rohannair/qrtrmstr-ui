// Testing PlaybookEditorHeader
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import PlaybookEditorHeader from './index.jsx';
const wrapper = shallow(<PlaybookEditorHeader/>);

test('PlaybookEditorHeader does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
