import React, { Component } from 'react';
import styles from './agendaFooter.css';

import moment from 'moment';
import classNames from 'classnames';
import Button from '../Button';

class AgendaFooter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: this.props.startTime,
      finishTime: this.props.finishTime,
      itemDate: this.props.itemDate,
      desc: this.props.desc
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      desc: nextProps.desc,
      itemDate: nextProps.itemDate,
      startTime: nextProps.startTime,
      finishTime: nextProps.finishTime,
      editing: false
    });
  };


  render() {
    const icon = this.props.icon === 'check'
    ? 'check'
    : 'plus';

    const buttonClasses = classNames(
      'md',
      {
        success: this.props.icon === 'check',
        primary: this.props.icon !== 'check'
      }
    );

    return (
      <div className="agenda-footer">
        <div className="dateInput">
          <span>Date:</span>
          <input type="date" value={this.state.itemDate} name="date" onChange={ e => this.setState({ itemDate: e.target.value}) } />
        </div>
        <div className="timeInput">
          <span>Start Time:</span>
          <input name="startTime" value={ this.state.startTime } type="time" max='24:00' onChange={ this._inputChange } />
        </div>
        <div className="timeInput">
          <span>End Time:</span>
          <input name="finishTime" value={ this.state.finishTime } type="time" max='24:00' onChange={ this._inputChange } />
        </div>
        <div className="descInput">
          <span> Description:</span>
          <input name="desc" value={ this.state.desc } type="text" onChange={ this._inputChange } />
        </div>
        <div className="toolButtonContainer">
          <Button classes={buttonClasses} icon={icon} onClick={ e => this.addItem(e) }/>
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

    const { startTime, finishTime, desc, itemDate } = this.state;
    // const { date } = this.props;
    // Validation to make sure that the start date is before the finish date
    if (moment(itemDate + ' ' + finishTime).diff(moment(itemDate + ' ' + startTime)) < 0) {
      this.setState({
        errorMessage: 'Start time must be before Finish time, please correct the dates and try again'
      });
      return;
    }

    // Check is the user is making an all day task
    if (startTime === '' && finishTime === '') return this.props.addNew('00:00', '23:59', itemDate, desc);

    return this.props.addNew(startTime, finishTime, itemDate, desc);
  };
}


export default AgendaFooter;
