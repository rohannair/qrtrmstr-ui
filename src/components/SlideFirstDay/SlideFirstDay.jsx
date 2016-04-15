import React, { Component } from 'react';
import styles from './slideFirstDay.css';
import { omit, pullAt } from 'lodash';

import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';

import TextBox from '../TextBox';

import FlipMove from 'react-flip-move';

class SlideFirstDay extends Component {
  state = {
    time: '',
    desc: '',
    mapDesc: this.props.body.map || ''
  };

  render() {
    const { onAdd } = this.props;
    const { agenda } =  this.props.body;
    const mapBody = this.props.body.map;
    const { mapDesc, time, desc } = this.state;
    const self = this;

    const items = agenda
    ? agenda.map((val, i) => {
      return (
        <div className="agenda-item" key={`agendaItem-${i}`}>
          <div className="timeInput">{val.time}</div>
          <div className="desc">{val.desc}</div>
          <div className="buttonContainer">
            <Button
              classes="transparent"
              icon="x"
              onClick={ self._deleteItem.bind(this, i) }
            />
          </div>
        </div>
      );
    })
    : null;


    return (
      <div className="slideFirstDay">
        <div className="map">
          <TextBox body={mapDesc}/>
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
              <input name="time" value={ time } onChange={ this._inputChange } />
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
    const newData = {
      heading: this.props.heading,
      body: {
        ...this.props.body,
        agenda: [
          ...this.props.body.agenda.slice(0, id),
          ...this.props.body.agenda.slice(id + 1)
        ]
      },
      type: this.props.type,
      slide_number: this.props.slide_number
    };

    return this.props.onEdit(newData);
  };

  _inputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  _addNew = e => {
    e.preventDefault();

    const { desc, time } = this.state;
    this.setState({
      ...this.state,
      desc: '',
      time: ''
    });

    const newData = {
      heading: this.props.heading,
      body: {
        ...this.props.body,
        agenda: [
          ...this.props.body.agenda,
          { desc, time }
        ]
      },
      type: this.props.type,
      slide_number: this.props.slide_number
    };

    return this.props.onEdit(newData);
  }
};

export default SlideFirstDay;
