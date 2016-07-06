// Deps
import React, { Component } from 'react';
import styles from './agenda.css';

import AgendaListItem from '../AgendaListItem';
import AgendaFooter from '../AgendaFooter';

import FlipMove from 'react-flip-move';
import moment from 'moment';

class Agenda extends Component {
  constructor(props) {
    super(props);

    // const lastAgendaItem = props.agenda[(props.agenda.length - 1)];
    // const finishTime = lastAgendaItem
    // ? lastAgendaItem.finishTime
    // : moment(this.props.date).startOf('day').toDate();

    this.state = {
      agenda: this.props.agenda,
      // startTime: moment(finishTime).format('H:mm'),
      // finishTime: moment(finishTime).add(1, 'hour').format('H:mm'),
      errorMessage: null
    };

  }

  render() {

    const agenda = this.props.agenda;

    const items = agenda
      ? agenda
          .sort((a, b) => a.startTime - b.startTime)
          .map((val, i) => {
            return (
              <AgendaListItem
                key={i}
                id={i}
                className="agenda-item"
                startTime={val.startTime}
                finishTime={val.finishTime}
                desc={val.desc}
                editItem={this._editItem}
                deleteItem={this._deleteItem}
              />
            );
          })
      : null;


    return (
      <div className="agenda">
        <div className="agenda-header">
          <div className="agendaTimeTitle">Time</div>
          <div className="agendaDescTitle">Description</div>
          <div className="agendaToolTitle">Tools</div>
        </div>
        <div className="agenda-items">
          {items}
        </div>

        <FlipMove enterAnimation="fade" leaveAnimation="fade">
        </FlipMove>
        <AgendaFooter
        addNew={this._addNew}
        />

        <div className="errorContainer">
          {/* { errorText } */}
        </div>
      </div>
    );
  };

  _deleteItem = id => {
    const newAgenda = [
      ...this.props.agenda.slice(0, id),
      ...this.props.agenda.slice(id + 1)
    ];
    return this.props.updateFirstDayState('agenda', newAgenda);
  };

  _editItem = newItem => {
    const { agenda } =  this.props;
    const newAgenda = agenda.map((val,i) => {
      if (val.desc === newItem.desc && val.startTime === newItem.startTime && val.finishTime === newItem.finishTime) return newItem;
      return val;
    });

    return this.props.updateFirstDayState('agenda', newAgenda);

  };

  _addNew = e => {
    e.preventDefault();

    const { agenda } =  this.props.agenda;
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

    return this.props.updateFirstDayState('agenda', newAgenda);
  };

}

export default Agenda;
