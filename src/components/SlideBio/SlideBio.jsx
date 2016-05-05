import React, { Component } from 'react';
import styles from './slideBio.css';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Card from '../Card';
import TextBox from '../TextBox';
import { updatePlaybookState } from '../../actions/playbookViewActions';

class SlideBio extends Component {
  state = {
    heading: this.props.body.heading,
    desc: this.props.body.desc,
    textAlign: this.props.body.textAlign || 'left'
  };

  render() {
    const { slide_number, id, onChange } = this.props;
    const { heading, desc } = this.state;
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
        </div>
        <TextBox slideNum={ slide_number } body={ this.state } textAlign={ this.state.textAlign } bodyKey="desc" updateSlide={ this._updateBioState } />
      </div>
    );
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
