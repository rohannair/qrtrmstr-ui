import React, { Component } from 'react';
import styles from './slideFirstDay.css';
import { omit } from 'lodash';

import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';

import FlipMove from 'react-flip-move';

class SlideFirstDay extends Component {
  state = {
    time: null,
    desc: null,
    mapDesc: this.props.body.map || ''
  };

  render() {
    const { onAdd } = this.props;
    const { agenda } =  this.props.body;
    const mapBody = this.props.body.map;
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
          <textarea value={ this.state.mapDesc } onChange={ this._mapDescChange }/>
        </div>
        <divl className="agenda">

          <div className="agenda-header">
            <div className="timeInput">Time</div>
            <div className="desc">Description</div>
          </div>

          <FlipMove easing="cubic-bezier(0, 0.7, 0.8, 0.1)">
            { items }
          </FlipMove>

          <div className="agenda-footer">
            <div className="timeInput">
              <input name="time" onChange={ this._inputChange } />
            </div>
            <div className="desc">
              <input name="desc" onChange={ this._inputChange } />
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
    return this.props.onDelete(id);
  };

  _inputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  _addNew = e => {
    e.preventDefault();
    return this.props.onAdd(this.state);
  }
};

export default SlideFirstDay;
