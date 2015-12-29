import React, { PropTypes } from 'react';
import { kebabCase } from 'lodash';

import Card from '../../components/Card';
import SingleChoice from '../../components/SingleChoice';

import styles from './survey.css';

export default class Survey extends React.Component {
  render() {
    return (
      <div className="container container-survey">
        <h1>What type of stuff do you want?</h1>

        <form>
          {this._returnOptions(this.props.fields)}

          <Card title="Software">
              <label>IDE/Text Editor:</label>
              <select>
                <option>Please select...</option>
                <option>Atom</option>
                <option>IntelliJ IDEA</option>
                <option>Sublime Text 3</option>
                <option>Webstorm</option>
              </select>
          </Card>
        </form>

      </div>
    );
  }

  _returnOptions = (fields) => {
    return fields.map(val => {
      switch (val.type) {
      case 'singleChoice':
        return <Card title={val.title}>{this._returnSingleChoices(val)}</Card>;
        break;

      case 'inputs':
      default:
        return <Card title={val.title}>{this._returnInputs(val)}</Card>;
        break;
      }
    });
  }

  _returnSingleChoices = val => val.options.map(opt => <SingleChoice name={val.name} key={kebabCase(opt.name)}>{opt.name}</SingleChoice>);

  _returnInputs = val => val.options.map(opt => <label key={kebabCase(opt.name)}>{opt.name + ': '}<input type={opt.input.type}/></label>);
}
