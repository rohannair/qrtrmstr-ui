import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import isDir from 'is-dir';
import chalk from 'chalk';

const name = process.argv[2];
if (!name) {
  console.log(chalk.red('Usage npm run newcomp <component-name>'));
  process.exit(0);
}

const componentName   = _.flowRight(_.upperFirst, _.camelCase)(name);
const componentNameLC = _.camelCase(name);
const dest            = path.join(__dirname, '..', 'src', 'components', componentName);

const tests = `import test from 'tape';
import dom from 'cheerio';
import React from 'react';

import ${componentName} from './index.jsx';

const renderText = React.renderToStaticMarkup;

test('${componentName}', next => {

  next.test('...with no props', assert => {

    const actual   = 'What is actual output';
    const expected = 'What is expected output';

    assert.equal(actual, expected,
      'What should the feature do?');

    assert.end();
  });
});
`;

const styleFile = `.${componentNameLC} {

}`;

const componentFile = `import React from 'react';
import styles from './${componentNameLC}.css';

const ${componentName} = (props) => {
  return (
    <div className="${componentNameLC}">
    </div>
  );
};

export default ${componentName};
`;

const indexFile = `import ${componentName} from './${componentName}';
export default ${componentName};
`;


if (isDir.sync(dest)) {
  console.error(chalk.red(`Component ${componentName} exists`));
  process.exit(0);
}

fs.mkdir(dest);
fs.writeFileSync(path.join(dest, 'index.jsx'), indexFile);
fs.writeFileSync(path.join(dest, `${componentName}.jsx`), componentFile);
fs.writeFileSync(path.join(dest, `${componentNameLC}.test.js`), tests);
fs.writeFileSync(path.join(dest, `${componentNameLC}.css`), styleFile);
console.log(chalk.green('Component Created'));
