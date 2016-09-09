import React, { Component } from 'react';
import styles from './slideBio.css';

import { capitalize } from 'lodash';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Card from '../Card';
import TextBox from '../TextBox';

class SlideBio extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      heading: this.props.body.heading,
      desc: this.props.body.desc,
      textAlign: this.props.body.textAlign || 'left',
    };
  }

  static defaultProps = {
    body: {
      heading: ''
    },
    body: { 
      options: []
    }
  }

  render() {
    const { slide_number, id, onChange } = this.props;
    const { heading, desc } = this.state;
    const options = this.props.body.options;
    const self = this;
    const bioOptions = Object.keys(options).map(val => {
      let label = val.split('_').join(' ');
      let opt = options[val];
      return (
        <label key={val}>
          <input
            htmlFor={val}
            type="checkbox"
            checked={opt}
            onChange={ self._updateSlideOption.bind(self, val) }
          />
          <span name={val} className="checkboxLabel">
            { capitalize(label) }
          </span>
        </label>
      );
    });

    return (
      <div className="slideBio">
        <div className="slide-input">
          <strong>Heading:</strong>
          <input
            name="heading"
            value={ heading }
            onChange={ e => this._updateBioState(e.target.name, e.target.value) }
          />
        </div>
        <div className="slideBio-options">
          <h3>Options</h3>
          { bioOptions }
        </div>
      </div>
    );
  };

  _updateSlideOption = val => {
    return this._updateBioState('options', {
      ...this.props.body.options,
      [val]: !this.props.body.options[val]
    });
  };

  _updateBioState = (key, value) => {
    const { slide_number, onChange, body } = this.props;
    const updatedSlide = {
      ...body,
      [key]: value
    };

    this.setState({
      ...this.state,
      [key]: value
    });
    return onChange('body', updatedSlide, slide_number);
  };
};

export default SlideBio;
