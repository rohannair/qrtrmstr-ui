// Deps
import React, { Component } from 'react';
import styles from './slideFirstDay.css';

import { omit, pullAt } from 'lodash';
import moment from 'moment';
import 'moment-range';

// Components
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';

import TextBox from '../TextBox';
import MapContainer from '../../containers/MapContainer';
import Agenda from '../../components/Agenda';

class SlideFirstDay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      desc: '',
      mapDesc: props.body.map || '',
      pos: props.position || {lat: 43.6446447, lng: -79.39499869999997},
      place: props.place || {name: 'Lighthouse Labs', formatted_address: '46 Spadina Avenue, Toronto, ON, Canada'}
    };
  }

  render() {
    const { onAdd, slide_number, body, onChange, heading, date, detailed_location, contact, couponInput } = this.props;
    const detLoc = detailed_location ? detailed_location : this.state.place.formatted_address;
    const mapBody = this.props.body.map;
    const { mapDesc, startTime, finishTime, desc, errorMessage } = this.state;

    const errorText = errorMessage ? <div className="errorText"><p className="errorMsg">{errorMessage}</p></div> : null;

    const couponInputFields = couponInput.show
    ?  <div className="slideEquipment">
        <div className="slide-input">
          <strong>Coupon Code:</strong>
          <input
            name="code"
            type="text"
            value = { couponInput.code }
            onChange={ e => this._updateDesc('couponInput', e.target.name, e.target.value) }
          />
        </div>
      </div>
    : null;

    return (
      <div className="slideFirstDay">
        <div className="slideEquipment">
          <div className="slide-input">
            <strong>Heading:</strong>
            <input
              name="heading"
              value={ heading }
              onChange={ e => this._updateFirstDayState(e.target.name, e.target.value) }
            />
          </div>
          <div className="slide-input">
            <strong>First Day:</strong>
            <input
              name="date"
              type="date"
              value = { date }
              onChange={ e => this._updateFirstDayState(e.target.name, e.target.value) }
            />
          </div>
        </div>
        <div className="mapContainerDivEdit">
          <div className="mapDiv">
            <MapContainer
              updateState={this._updateFirstDayState}
              updateLocation={this._updateFirstDayState}
              editing={true}
              pos={this.state.pos}
              place={this.state.place}
            />
          </div>
        </div>
        <div className="bodyMap">
          <div className="slideEquipment">
            <div className="slide-input">
              <strong>Detailed Location:</strong>
              <input
                name="detailed_location"
                type="text"
                value={ detLoc }
                onChange={ e => this._updateFirstDayState(e.target.name, e.target.value) }
              />
            </div>
            <div className="slide-input">
              <strong>Contact Title:</strong>
              <input
                name="title"
                type="text"
                value = { contact.title }
                onChange={ e => this._updateDesc('contact', e.target.name, e.target.value) }
              />
            </div>
            <div className="slide-input">
              <strong>Contact Name:</strong>
              <input
                name="name"
                type="text"
                value = { contact.name }
                onChange={ e => this._updateDesc('contact', e.target.name, e.target.value) }
              />
            </div>
            <div className="slide-input">
              <strong>Contact Email:</strong>
              <input
                name="email"
                type="text"
                value = { contact.email }
                onChange={ e => this._updateDesc('contact', e.target.name, e.target.value) }
              />
            </div>
            <div className="slide-input">
              <label className="coupon">
              <input
                className='couponCheckbox'
                type="checkbox"
                checked={ couponInput.show }
                onChange={ this._toggleCouponInput }
              />
              <span className="checkboxLabel">
                { '  Include UBER Coupon' }
              </span>
            </label>
            </div>
            { couponInputFields }
          </div>
        </div>
           <Agenda
            agenda={this.props.body.agenda}
            updateFirstDayState={this._updateFirstDayState}
            date={date}
          />
      </div>
    );
  };

  _toggleCouponInput = () => {
    const { couponInput } = this.props;
    const newValue = {
      ...couponInput,
      show: !couponInput.show
    };
    this._updateFirstDayState('couponInput', newValue);
  };

  _updateDesc = (masterKey, key, value) => {
    const { contact, couponInput } = this.props;
    const allValues = masterKey === 'contact' ? contact : couponInput;
    const newValue = {
      ...allValues,
      [key]: value
    };

    this._updateFirstDayState(masterKey, newValue);
  };

  _updateFirstDayState = (key, value) => {
    const { onChange, body, slide_number } = this.props;
    let updatedSlide = null;
    let slideKey = null;
    if (Object.keys(this.props).indexOf(key) > -1) {
      updatedSlide = value;
      slideKey = key;
    } else {
      updatedSlide = {
        ...body,
        [key]: value
      };
      slideKey = 'body';
    }

    return onChange(slideKey, updatedSlide, slide_number);
  };

};

export default SlideFirstDay;
