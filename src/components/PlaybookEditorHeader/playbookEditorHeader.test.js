// Testing PlaybookEditorHeader
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import PlaybookEditorHeader from './index.jsx';

test.skip('PlaybookEditorHeader does not explode', t => {
  const wrapper = shallow(<PlaybookEditorHeader/>);
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
