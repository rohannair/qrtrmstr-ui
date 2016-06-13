import test from 'tape';
import dom from 'cheerio';
import React from 'react';

import Pill from './index.jsx';

const renderText = React.renderToStaticMarkup;

test('Pill', next => {

  next.test('...with no props', assert => {

    const actual   = 'What is actual output';
    const expected = 'What is expected output';

    assert.equal(actual, expected,
      'What should the feature do?');

    assert.end();
  });
});
