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

const tests = `// Testing ${componentName}
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import ${componentName} from './index.jsx';
const wrapper = shallow(<${componentName}/>);

test('${componentName} does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
`;

const styleFile = `.${componentNameLC} {}`;

const componentFile = `import React, { Proptypes } from 'react';
import styles from './${componentNameLC}.css';

const ${componentName} = (props) => {
  return (
    <div className="${componentNameLC}">
    </div>
  );
};

${componentName}.proptypes = {};

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
