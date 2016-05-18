import React, { Component } from 'react';
import styles from './slideFirstDay.css';
import { omit, pullAt } from 'lodash';

import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';
import { updatePlaybookState } from '../../actions/playbookViewActions';

import TextBox from '../TextBox';

import FlipMove from 'react-flip-move';

class SlideFirstDay extends Component {
  state = {
    time: '00:00',
    desc: '',
    mapDesc: this.props.body.map || ''
  };

  render() {
    const { onAdd, slide_number, body, onChange, heading } = this.props;
    const { agenda } =  this.props.body;
    const mapBody = this.props.body.map;
    const { mapDesc, time, desc } = this.state;
    const self = this;

    const items = agenda
    ? agenda
      .sort(function(a, b){
        if(a.time.slice(-2) === 'pm' && parseInt(a.time.slice(0,-2).replace(':','')) < 1200) {
            a = parseInt(a.time.slice(0,-2).replace(':',''))+1200
          } else if (a.time.slice(-2) === 'am' && parseInt(a.time.slice(0,-2).replace(':','')) >= 1200) {
            a = parseInt(a.time.slice(0,-2).replace(':',''))-1200
          } else {
            a = parseInt(a.time.slice(0,-2).replace(':',''))
          }

        if(b.time.slice(-2) === 'pm' && parseInt(b.time.slice(0,-2).replace(':','')) < 1200) {
            b = parseInt(b.time.slice(0,-2).replace(':',''))+1200
          } else if (b.time.slice(-2) === 'am' && parseInt(b.time.slice(0,-2).replace(':','')) >= 1200) {
            b = parseInt(b.time.slice(0,-2).replace(':',''))-1200
          } else {
            b = parseInt(b.time.slice(0,-2).replace(':',''))
          }
          
        return a-b
      })
      .map((val, i) => {
      return (
        <div className="agenda-item" key={`agendaItem-${i}`}>
          <div className="timeInput">{val.time}</div>
          <div className="desc">{val.desc}</div>
          <div className="buttonContainer">
            <Button
              classes="transparent"
              icon="times"
              onClick={ self._deleteItem.bind(this, i) }
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
              <input name="time" value={ time } type="time" max='12:00' defaultValue='00:00' onChange={ this._inputChange } />
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
    let initialHour = (time.split(':'))[0];
    const minutesAm = ':' + (time.split(':'))[1] + 'am';
    const minutesPm = ':' + (time.split(':'))[1] + 'pm';
    let newValue = '';
    if (initialHour > 11) {
      if (Number(initialHour) === 12) {
        newValue = initialHour + minutesPm;
      } else {
        newValue = initialHour - 12 + minutesPm;
      }
    } if (initialHour > 9 && initialHour < 12) {
      newValue = initialHour + minutesAm;
    } if (initialHour < 10) {
      if (Number(initialHour) === 0) {
        newValue = '12' + minutesAm;
      } else {
        newValue = initialHour[1] + minutesAm;
      }
    }

    this.setState({
      ...this.state,
      desc: '',
      time: '00:00'
    });

    const newAgenda = [
      ...agenda,
      { desc, time: newValue }
    ];

    return this._updateFirstDayState('agenda', newAgenda);
  };
};

export default SlideFirstDay;
