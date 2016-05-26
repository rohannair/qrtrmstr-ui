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

import FlipMove from 'react-flip-move';

class SlideFirstDay extends Component {
  state = {
    desc: '',
    mapDesc: this.props.body.map || '',
    startTime: this.props.startTime,
    finishTime: this.props.finishTime,
    errorMessage: null
  };

  render() {
    const { onAdd, slide_number, body, onChange, heading, date } = this.props;
    const { agenda } =  this.props.body;
    const mapBody = this.props.body.map;
    const { mapDesc, startTime, finishTime, desc, errorMessage } = this.state;
    const deleteItem = this._deleteItem;
    const errorText = errorMessage ? <div className="errorText"><p className="errorMsg">{errorMessage}</p></div> : null;

    const items = agenda
      ? agenda
          .sort((a, b) => { return a.finishTime-b.startTime } )
          .map((val, i) => {
            return (
              <div className="agenda-item" key={`agendaItem-${i}`}>
                <div className="timeInput">{moment(val.startTime).format('h:mm')} - {moment(val.finishTime).format('h:mm A')} </div>
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
        <div className="map">
          <TextBox body={ body } bodyKey="map"/>
        </div>

        <divl className="agenda">
          <div className="agenda-header">
            <div className="timeInput">Time</div>
            <div className="desc">Description</div>
          </div>

          <FlipMove enterAnimation="fade" leaveAnimation="fade">
            { items }
          </FlipMove>

          <div className="agenda-footer">
            <div className="timeInput">
              <label><strong>Start</strong></label>
              <input name="startTime" value={ startTime } type="time" max='24:00' defaultValue='00:00' onChange={ this._inputChange } />
            </div>
            <div className="timeInput">
              <label><strong>Finish</strong></label>
              <input name="finishTime" value={ finishTime } type="time" max='24:00' defaultValue='00:00' onChange={ this._inputChange } />
            </div>
            <div className="desc">
              <input name="desc" value={ desc } onChange={ this._inputChange } />
            </div>
            <div className="buttonContainer">
              <Button classes="primary md" icon="plus" onClick={ this._addNew }/>
            </div>
          </div>
          <div className="errorContainer">
            { errorText }
          </div>
        </divl>
      </div>
    );
  };

  _mapDescChange = e => {
    const { value } = e.target;
    this.setState({
      mapDesc: value
    });
  };

  _deleteItem = id => {
    const newAgenda = [
      ...this.props.body.agenda.slice(0, id),
      ...this.props.body.agenda.slice(id + 1)
    ];

    return this._updateFirstDayState('agenda', newAgenda);
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
      return
    }

    // Validation to check that the new item does not overlap any current agenda items
    for (let item in agenda) {
      if(moment.range(moment(date + ' ' + startTime), moment(date + ' ' + finishTime)).overlaps(moment.range(agenda[item].startTime, agenda[item].finishTime))) {
        this.setState({
          errorMessage: 'You all ready have something scheduled during that time period'
        });
        return
      }
    }

    this.setState({
      ...this.state,
      desc: '',
      startTime: '12:00',
      finishTime: '12:30',
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
