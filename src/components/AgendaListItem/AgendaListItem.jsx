import React, { Component } from 'react';

import styles from './agendaListItem.css';

import Button from '../Button';
import AgendaFooter from '../AgendaFooter';

import moment from 'moment';

class AgendaListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      desc: this.props.desc,
      itemDate: moment(this.props.startTime).format('YYYY-MM-DD'),
      startTime: moment(this.props.startTime).format('HH:mm'),
      finishTime: moment(this.props.finishTime).format('HH:mm'),
      editing: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      desc: nextProps.desc,
      id: nextProps.id,
      itemDate: moment(nextProps.startTime).format('YYYY-MM-DD'),
      startTime: moment(nextProps.startTime).format('HH:mm'),
      finishTime: moment(nextProps.finishTime).format('HH:mm'),
      editing: false
    });
  };

  render() {

    if (this.state.editing) {
      return <AgendaFooter
        startTime={moment(this.props.startTime).format('HH:mm')}
        finishTime={moment(this.props.finishTime).format('HH:mm')}
        itemDate={moment(this.props.itemDate).format('YYYY-MM-DD')}
        desc={this.props.desc}
        addNew={ this._editItem }
        icon="check"
      />;
    }

    return (
      <div className="agendaItem">
        <div className="dates">
          <div className="date">{ moment(this.props.startTime).format('MMM DD, YYYY') }</div>
          { moment(this.props.startTime).format('hh:mm A') + ' to ' + moment(this.props.finishTime).format('hh:mm A')}
        </div>
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
  };

  _editItem = (start, finish, itemDate, desc) => {
    const { id } = this.state;
    const { date } = this.props;

    const startTime = +moment(itemDate + ' ' + start).format('x');
    const finishTime = +moment(itemDate + ' ' + finish).format('x');

    this.props.editItem({ startTime, finishTime, desc}, id);

    return this.setState({
      editing: false
    });
  }
}

export default AgendaListItem;
