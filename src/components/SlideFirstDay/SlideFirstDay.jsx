// Deps
import React, { Component } from 'react';
import styles from './slideFirstDay.css';

import { omit, pullAt } from 'lodash';
import moment from 'moment';
import 'moment-range';

// Components
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';
import { updatePlaybookState } from '../../actions/playbookViewActions';

import TextBox from '../TextBox';
import MapContainer from '../../containers/MapContainer';

import FlipMove from 'react-flip-move';

class SlideFirstDay extends Component {
  constructor(props) {
    super(props);

    const lastAgendaItem = props.body.agenda[(props.body.agenda.length - 1)];
    const finishTime = lastAgendaItem
    ? lastAgendaItem.finishTime
    : moment(this.props.date).startOf('day').toDate();

    this.state = {
      desc: '',
      mapDesc: props.body.map || '',
      pos: props.position || {lat: 43.6446447, lng: -79.39499869999997},
      place: props.place || {name: 'Lighthouse Labs', formatted_address: '46 Spadina Avenue, Toronto, ON, Canada'},
      startTime: moment(finishTime).format('H:mm'),
      finishTime: moment(finishTime).add(1, 'hour').format('H:mm'),
      errorMessage: null
    };
  }

  render() {
    const { onAdd, slide_number, body, onChange, heading, date, detailed_location, contact, couponInput } = this.props;
    const detLoc = detailed_location ? detailed_location : this.state.place.formatted_address;
    const { agenda } =  this.props.body;
    const mapBody = this.props.body.map;
    const { mapDesc, startTime, finishTime, desc, errorMessage } = this.state;
    const deleteItem = this._deleteItem;
    const errorText = errorMessage ? <div className="errorText"><p className="errorMsg">{errorMessage}</p></div> : null;

    const items = agenda
      ? agenda
          .sort((a, b) => { return a.startTime-b.startTime } )
          .map((val, i) => {
            return (
              <div className="agenda-item" key={`agendaItem-${i}`}>
                <div className="timeInput agendaTimeItem">{moment(val.startTime).format('h:mm A')} - {moment(val.finishTime).format('h:mm A')} </div>
                <div className="desc">{val.desc}</div>
                <div className="buttonContainer">
                  <Button
                    classes="transparent"
                    icon="times"
                    onClick={ deleteItem.bind(this, i) }
                  />
                </div>
              </div>
            );
          })
      : null;

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

        <divl className="agenda">
          <div className="agenda-header">
            <div className="timeInput agendaTimeTitle">Time</div>
            <div className="desc">Description</div>
          </div>

          <FlipMove enterAnimation="fade" leaveAnimation="fade">
            { items }
          </FlipMove>

          <div className="agenda-footer">
            <div className="timeInput">
              <input name="startTime" value={ startTime } type="time" max='24:00' onChange={ this._inputChange } />
            </div>
            <p>to</p>
            <div className="timeInput">
              <input name="finishTime" value={ finishTime } type="time" max='24:00' onChange={ this._inputChange } />
            </div>
            <div className="desc">
              <input name="desc" value={ desc } onChange={ this._inputChange } />
            </div>
            <div className="buttonContainer">
              <Button classes="primary md addItemBtn" icon="plus" onClick={ this._addNew }/>
            </div>
          </div>
          <div className="errorContainer">
            { errorText }
          </div>
        </divl>
      </div>
    );
  };

  _deleteItem = id => {
    const newAgenda = [
      ...this.props.body.agenda.slice(0, id),
      ...this.props.body.agenda.slice(id + 1)
    ];

    return this._updateFirstDayState('agenda', newAgenda);
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

  _inputChange = e => {
    const { agenda } =  this.props.body;
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  _addNew = e => {
    e.preventDefault();

    const { agenda } =  this.props.body;
    const { desc, startTime, finishTime } = this.state;
    const { date } = this.props;

    // Validation to make sure that the start date is before the finish date
    if (moment(date + ' ' + finishTime).diff(moment(date + ' ' + startTime)) <= 0) {
      this.setState({
        errorMessage: 'Start time must be before Finish time, please correct the dates and try again'
      });
      return;
    }

    this.setState({
      ...this.state,
      desc: '',
      startTime: finishTime,
      finishTime: moment(date + ' ' + finishTime).add(1, 'hour').format('H:mm'),
      errorMessage: null
    });

    const newAgenda = [
      ...agenda,
      { desc, startTime: +moment(date + ' ' + startTime).format('x'), finishTime: +moment(date + ' ' + finishTime).format('x') }
    ];

    return this._updateFirstDayState('agenda', newAgenda);
  };
};

export default SlideFirstDay;
