const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const isDir = require('is-dir');
const chalk = require('chalk');

const name = process.argv[2];
if (!name) {
  console.log(chalk.red('Usage npm run newcont <container-name>'));
  process.exit(0);
}

const containerName   = _.flowRight(_.upperFirst, _.camelCase)(name);
const containerNameLC = _.camelCase(name);
const dest            = path.join(__dirname, '..', 'src', 'containers', containerName);

const tests = `// Testing ${containerName}
import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import ${containerName} from './index.jsx';
const wrapper = shallow(<${containerName}/>);

test('${containerName} does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
`;

const styleFile = `.${containerNameLC} {

}`;

const containerFile = `import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './${containerNameLC}.css';

class ${containerName} extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static defaultProps = {

  }

  static propTypes = {

  }

  componentWillMount() {

  }

  componentDidMount() {

  }

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
