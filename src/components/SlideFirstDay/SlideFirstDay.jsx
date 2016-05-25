// Deps
import React, { Component } from 'react';
import styles from './slideFirstDay.css';

import { omit, pullAt } from 'lodash';
import moment from 'moment';

// Components
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';
import { updatePlaybookState } from '../../actions/playbookViewActions';

import TextBox from '../TextBox';

import FlipMove from 'react-flip-move';

class SlideFirstDay extends Component {
  state = {
    time: moment().valueOf(),
    desc: '',
    mapDesc: this.props.body.map || ''
  };

  render() {
    const { onAdd, slide_number, body, onChange, heading, date } = this.props;
    const { agenda } =  this.props.body;
    const mapBody = this.props.body.map;
    const { mapDesc, time, desc } = this.state;
    const deleteItem = this._deleteItem;

    const items = agenda
      ? agenda
          .sort((a, b) => { return a.time-b.time } )
          .map((val, i) => {
            return (
              <div className="agenda-item" key={`agendaItem-${i}`}>
                <div className="timeInput">{moment(val.time).format('h:mm A')}</div>
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
              <input name="time" type="time" max='24:00' defaultValue='00:00' onChange={ this._inputChange } />
            </div>
            <div className="desc">
              <input name="desc" value={ desc } onChange={ this._inputChange } />
            </div>
            <div className="buttonContainer">
              <Button classes="primary md" icon="plus" onClick={ this._addNew }/>
            </div>
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
    const { desc, time } = this.state;
    const { date } = this.props;

    this.setState({
      ...this.state,
      desc: '',
      time: '00:00'
    });

    const newAgenda = [
      ...agenda,
      { desc, time: +moment(date + ' ' + time).format('x') }
    ];

    return this._updateFirstDayState('agenda', newAgenda);
  };
};

export default SlideFirstDay;
