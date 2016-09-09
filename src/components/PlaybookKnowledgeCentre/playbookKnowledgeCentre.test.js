// Testing PlaybookKnowledgeCentre
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import PlaybookKnowledgeCentre from './index.jsx';
const wrapper = shallow(<PlaybookKnowledgeCentre body={{ options: [ { id: 0 } ] }}/>);

test('PlaybookKnowledgeCentre does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
