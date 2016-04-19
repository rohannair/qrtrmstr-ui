import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import isDir from 'is-dir';
import chalk from 'chalk';

const name = process.argv[2];
if (!name) {
  console.log(chalk.red('Usage npm run newcont <container-name>'));
  process.exit(0);
}

const containerName   = _.flowRight(_.capitalize, _.camelCase)(name);
const containerNameLC = _.camelCase(name);
const dest            = path.join(__dirname, '..', 'src', 'containers', containerName);

const tests = `import test from 'tape';
import dom from 'cheerio';
import React from 'react';

import ${containerName} from './index.jsx';

const renderText = React.renderToStaticMarkup;

test('${containerName}', next => {

  next.test('...with no props', assert => {

    const actual   = 'What is actual output';
    const expected = 'What is expected output';

    assert.equal(actual, expected,
      'What should the feature do?');

    assert.end();
  });
});
`;

const styleFile = `.${containerNameLC} {

}`;

const containerFile = `import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './${containerNameLC}.css';

class ${containerName} extends Component {

  render() {
    return (
      <div className="${containerNameLC}">
      </div>
    );
  }
}

function mapStateToProps(state) {
  const token = state.accountActions.token || Cookies.get('token');

  return {
    token
  };
}

export default connect(mapStateToProps)(${containerName});

`;

const indexFile = `import ${containerName} from './${containerName}';
export default ${containerName};
`;

if (isDir.sync(dest)) {
  console.error(chalk.red(`Container ${containerName} already exists`));
  process.exit(0);
}

fs.mkdir(dest);
fs.writeFileSync(path.join(dest, 'index.jsx'), indexFile);
fs.writeFileSync(path.join(dest, `${containerName}.jsx`), containerFile);
fs.writeFileSync(path.join(dest, `${containerNameLC}.test.js`), tests);
fs.writeFileSync(path.join(dest, `${containerNameLC}.css`), styleFile);

console.log(chalk.green(`Container ${containerName} created`));
