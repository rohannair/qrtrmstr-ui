import React, { Component } from 'react';
import styles from './slideFirstDay.css';
import { omit } from 'lodash';

import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';

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

    const items = [].concat(agenda).map((val, i) => {
      return (
        <tr key={`agendaItem-${i}`}>
          <td className="timeInput">{val.time}</td>
          <td className="desc">{val.desc}</td>
          <td>
            <Button
              classes="transparent"
              icon="x"
              onClick={ self._deleteItem.bind(this, i) }
            />
          </td>
        </tr>
      );
    });

    return (
      <div className="slideFirstDay">
        <div className="map">
          <textarea value={ this.state.mapDesc } onChange={ this._mapDescChange }/>
        </div>

        <table className="agenda">
          <thead className="header">
            <tr>
              <th className="timeInput">Time</th>
              <th>Description</th>
              <th />
            </tr>
          </thead>
          <tbody>
            { items }
          </tbody>
          <tfoot>
            <tr>
            <td className="timeInput">
                <input name="time" onChange={ this._inputChange } />
              </td>
              <td className="desc">
                <input name="desc" onChange={ this._inputChange } />
              </td>
              <td>
                <Button classes="primary md" icon="plus" onClick={ this._addNew }/>
              </td>
            </tr>
          </tfoot>
        </table>
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
