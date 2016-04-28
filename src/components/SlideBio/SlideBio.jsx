import React, { Component } from 'react';
import styles from './slideBio.css';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Card from '../Card';
import TextBox from '../TextBox';
import { updateSurveyState } from '../../actions/surveyViewActions';

class SlideBio extends Component {
  state = {
    heading: this.props.body.heading,
    desc: this.props.body.desc
  };

  render() {
    const { slide_number, id, dispatch, onChange, body } = this.props;
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
        <TextBox dispatch={ dispatch } slideNum={ slide_number } body={ body } bodyKey="desc" onChange={ this._updateBioState } />
      </div>
    );
  };

  _updateBioState = (key, value) => {
    const { dispatch, slide_number, body } = this.props;
    const updatedSlide = {
      body: {
        ...body,
        [key]: value
      }
    };
    this.setState({
      ...this.state,
      [key]: value
    });

    return dispatch(updateSurveyState(slide_number, updatedSlide));
  };
};

export default SlideBio;
