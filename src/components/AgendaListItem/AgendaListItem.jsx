import React, { Component } from 'react';

import styles from './agendaListItem.css';

import Button from '../Button';
import moment from 'moment';

class AgendaListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      desc: this.props.desc,
      itemDate: moment(this.props.itemDate).format('YYYY-MM-DD'),
      startTime: moment(this.props.startTime).format('HH:mm'),
      finishTime: moment(this.props.finishTime).format('HH:mm'),
      editing: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      desc: nextProps.desc,
      id: nextProps.id,
      itemDate: moment(nextProps.itemDate).format('YYYY-MM-DD'),
      startTime: moment(nextProps.startTime).format('HH:mm'),
      finishTime: moment(nextProps.finishTime).format('HH:mm'),
      editing: false
    });
  };


  render() {

    const item = this.state.editing
    ? (
        <div className="agendaItem">
          <div className="agendaItem-date-input">
            <input type="date" value={this.state.itemDate} name="date" onChange={ e => this.setState({ itemDate: e.target.value}) } />
          </div>
          <div className="agendaItem-time-input">
            <input name="startTime" value={ this.state.startTime } type="time" max='24:00' onChange={ e => this.setState({ startTime: e.target.value}) } />
          </div>
          <div className="agendaItem-time-input">
            <input name="finishTime" value={ this.state.finishTime } type="time" max='24:00' onChange={ e => this.setState({ finishTime: e.target.value})  } />
          </div>
          <div className="agendaItem-desc">
            <input name="desc" value={ this.state.desc } onChange={ e => this.setState({ desc: e.target.value})  } />
          </div>
          <div className="toolButtonContainer">
            <Button classes="primary sm" icon="plus" onClick={ e => this._updateItem() } />
          </div>
        </div>
      )
    : (
        <div className="agendaItem">
          <div className="agendaItem-date">{ this.state.itemDate }</div>
          <div className="agendaItem-time">{moment(this.props.startTime).format('h:mm A')} - {moment(this.props.finishTime).format('h:mm A')}</div>
          <div className="agendaItem-desc">{this.state.desc}</div>
          <div className="agendaItem-toolButtonContainer">
            <Button
              classes="transparent"
              icon="pencil"
              onClick={ e => this.setState({ editing: true}) }
            />
            <Button
              classes="transparent"
              icon="times"
              onClick={ e => this.props.deleteItem(this.state.id) }
            />
          </div>
        </div>
      );
    return (
      <div>
        { item }
      </div>
    );
  };

  _updateItem = () => {
    const { id, desc } = this.state;
    const { date } = this.props;
    const startTime = +moment(this.state.date + ' ' + this.state.startTime).format('x');
    const finishTime = +moment(this.state.date + ' ' + this.state.finishTime).format('x');
    this.props.editItem({ startTime, finishTime, desc}, id);
    return this.setState({editing: false});
  }
}

export default AgendaListItem;
