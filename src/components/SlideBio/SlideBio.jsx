import React, { Component } from 'react';
import styles from './slideBio.css';

import { capitalize } from 'lodash';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Card from '../Card';
import TextBox from '../TextBox';
import { updatePlaybookState } from '../../actions/playbookViewActions';

class SlideBio extends Component {
  state = {
    heading: this.props.body.heading,
    desc: this.props.body.desc,
    textAlign: this.props.body.textAlign || 'left',
    options: this.props.body.options || {}
  };

  render() {
    const { slide_number, id, onChange } = this.props;
    const { heading, desc, options } = this.state;
    let self = this;

    const bioOptions = Object.keys(options).map(val => {
      let label = val.split('_').join(' ');
      let opt = options[val];
      return (
        <label key={val}>
          <input
            for={val}
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
        <div className="slideEquipment">
          <div className="slide-input">
            <strong>Heading:</strong>
            <input
              name="heading"
              value={ heading }
              onChange={ e => this._updateBioState(e.target.name, e.target.value) }
            />
          </div>
          <div className="options">
            { bioOptions }
          </div>
        </div>
      </div>
    );
  };

  _updateSlideOption = val => {
    console.log('Updated', val);

    this.setState({
      ...this.state,
      options: {
        ...this.state.options,
        [val]: !this.state.options[val]
      }
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
