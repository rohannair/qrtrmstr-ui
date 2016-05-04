import test from 'tape';
import dom from 'cheerio';
import React from 'react';

import * as Playbook from './index.jsx';

const renderText = React.renderToStaticMarkup;

test('Playbook', next => {

  next.test('...with no props', assert => {

    const actual   = 'Output';
    const expected = 'Output';

    assert.equal(actual, expected,
      'What should the feature do?');

    assert.end();
  });
});
