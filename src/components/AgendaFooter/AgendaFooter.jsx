import React, { Component } from 'react';
import styles from './agendaFooter.css';

import moment from 'moment';
import Button from '../Button';

class AgendaFooter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemDate: this.props.itemDate,
      startTime: this.props.startTime,
      finishTime: this.props.finishTime,
      desc: this.props.desc
    };
  }

  render() {
    return (
      <div className="agenda-footer">
        <div className="dateInput">
          <input type="date" value={this.state.date} name="date" onChange={ e => this.setState({ date: e.target.value}) } />
        </div>
        <div className="timeInput">
          <input name="startTime" value={ this.state.startTime } type="time" max='24:00' onChange={ this._inputChange } />
        </div>
        <div className="timeInput">
          <input name="finishTime" value={ this.state.finishTime } type="time" max='24:00' onChange={ this._inputChange } />
        </div>
        <div className="descInput">
          <input name="desc" value={ this.state.desc } type="text" onChange={ this._inputChange } />
        </div>
        <div className="toolButtonContainer">
          <Button classes="primary md" icon="plus" onClick={ e => this.addItem(e) }/>
        </div>
      </div>
    );
  }

  _inputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  addItem = e => {
    e.preventDefault();

    const { startTime, finishTime, desc } = this.state;
    const { date } = this.props;
    // Validation to make sure that the start date is before the finish date
    if (moment(date + ' ' + finishTime).diff(moment(date + ' ' + startTime)) <= 0) {
      this.setState({
        errorMessage: 'Start time must be before Finish time, please correct the dates and try again'
      });
      return;
    }

    return this.props.addNew(startTime, finishTime, desc);
  };
}


export default AgendaFooter;
