import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './sendSurveyModal.css';
import { Modal } from 'react-bootstrap';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';

class SendSurveyModal extends Component {
  state = {
    selectedPerson: {},
    value
  }

  render() {
    const { surveyName, surveyID, users, showModal, toggleModal, sendSurvey, onChange } = this.props;

    
     // *
     // * 1. Rename val
     // * 2. Only store the surveyId as the value of the option
     // * 3. OnChange pushes val[surveyId] (<-- will be renamed) into state
     // * 4. Add submit handler to push selectedPerson into SurveyView
     // * 5. Set initial value on render
     // *
     


    const userOptions = Object.keys(users).map(index => {
      let user = users[index];
      let userInfo = { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email, surveyID }
      if (value == (val.length)-1) {
        // onChange(userInfo);
        return <option selected="selected" value={userInfo} key={vals.id}>{vals.first_name + " " + vals.last_name}</option>
      } else {
        return <option value={ userInfo } key={vals.id}>{vals.first_name + " " + vals.last_name}</option>
      }
    })


    return (
      <Modal animation={true} show={showModal} onHide={toggleModal}>
        <Card className="modal">
          <Modal.Header closeButton>
            <Modal.Title>Send survey {surveyName} to user ({ this.state.selectedPerson })</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="formField">
              <label>User: </label>
              <select onChange={ this._onChange }>// value={/* value */}>
                { userOptions }
              </select>
            </div>          
          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup>
              <Button classes="primary sm" onClick={sendSurvey}>Send Email</Button>
              <Button classes="primary sm" onClick={toggleModal}>Cancel</Button>
            </ButtonGroup>
          </Modal.Footer>
        </Card>
      </Modal>
    );
  };

  _onChange = (e) => {
    debugger;
    this.setState({
      selectedPerson: e.target.value
    });
    //onChange(e.target.options[e.target.selectedIndex].value)
  }
};

export default SendSurveyModal;
