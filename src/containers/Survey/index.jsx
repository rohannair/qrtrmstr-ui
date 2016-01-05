// Deps
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Utils
import { kebabCase } from 'lodash';

// Components
import Card from '../../components/Card';
import SingleChoice from '../../components/SingleChoice';
import InputGroup from '../../components/InputGroup';

// Styles
import styles from './survey.css';

class Survey extends Component {
  render() {
    const { fields } = this.props;

    return (
      <div className="container container-survey">
        <h1>What type of stuff do you want?</h1>

        <form>
          { this._returnCards(fields) }
        </form>

      </div>
    );
  }

  _returnCards = (fields) => {
    return [...fields].map(val => {
      return <Card title={val.title} key={val.id}>{this._returnOptComponent(val)}</Card>;
    });
  }

  _returnOptComponent = (val) => {
    switch (val.type) {
    case 'singleChoice':
      return this._returnSingleChoices(val);
      break;

    case 'inputs':
    default:
      return <InputGroup groupOption={val} />;
      break;
    }
  }

  _returnSingleChoices = val => val.options.map(opt => <SingleChoice name={val.name} key={kebabCase(opt.name)}>{opt.name}</SingleChoice>);

  _returnInputs = val => val.options.map(opt => <label key={kebabCase(opt.name)}>{opt.name + ': '}<input type={opt.input.type}/></label>);
}

function select(state) {
  return {
    fields: state.default.fields,
  };
}

export default connect(select)(Survey);
