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

    const lastAgendaItem = props.agenda[(props.agenda.length - 1)];
    const finishTime = lastAgendaItem
    ? lastAgendaItem.finishTime
    : moment(this.props.date).startOf('day').toDate();

    this.state = {
      agenda: this.props.agenda,
      date: this.props.date,
      startTime: moment(finishTime).format('H:mm'),
      finishTime: moment(finishTime).add(1, 'hour').format('H:mm'),
      errorMessage: null
    };

  }

  componentWillReceiveProps(nextProps) {

    const lastAgendaItem = nextProps.agenda[(nextProps.agenda.length - 1)];
    const finishTime = lastAgendaItem
    ? lastAgendaItem.finishTime
    : moment(this.props.date).startOf('day').toDate();

    this.setState({
      agenda: nextProps.agenda,
      startTime: moment(finishTime).format('H:mm'),
      finishTime: moment(finishTime).add(1, 'hour').format('H:mm')
    });
  }

  render() {

    const agenda = this.state.agenda;

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
                date={this.props.date}
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
        date={this.state.date}
        startTime={this.state.startTime}
        finishTime={this.state.finishTime}
        desc={this.state.desc}
        />

        <div className="errorContainer">
          {/* { errorText } */}
        </div>
      </div>
    );
  };

  _deleteItem = id => {
    debugger;
    const newAgenda = [
      ...this.props.agenda.slice(0, id),
      ...this.props.agenda.slice(id + 1)
    ];
    return this.props.updateFirstDayState('agenda', newAgenda);
  };

  _editItem = (newItem, id) => {
    const { agenda } =  this.props;
    let newAgenda = agenda;
    newAgenda[id] = newItem;
    return this.props.updateFirstDayState('agenda', newAgenda);
  };

  _addNew = (startTime, finishTime, desc) => {
    const { agenda, date } =  this.props;

    this.setState({
      ...this.state,
      desc: '',
      startTime: moment(date + ' ' + finishTime).format('H:mm'),
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
