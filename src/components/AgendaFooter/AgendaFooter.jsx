import React, { Component } from 'react';
import styles from './agendaFooter.css';

import Button from '../Button';

class AgendaFooter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: '',
      finishTime: '',
      desc: ''
    };
  }

  render() {
    return (
      <div className="agenda-footer">
        <div className="timeInput">
          <input name="startTime" value={ this.state.startTime } type="time" max='24:00' onChange={ this._inputChange } />
        </div>
        <div className="timeInput">
          <input name="finishTime" value={ this.state.finishTime } type="time" max='24:00' onChange={ this._inputChange } />
        </div>
        <div className="descInput">
          <input name="desc" value={ this.state.desc } onChange={ this._inputChange } />
        </div>
        <div className="toolButtonContainer">
          <Button classes="primary md" icon="plus" onClick={ this.props.addNew }/>
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
}


export default AgendaFooter;
