// Deps
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

// Styles
import classNames from 'classnames';
import styles from './sendSurveyModal.css';

// Components
import Card from '../../components/Card';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';

class SendSurveyModal extends Component {

  componentWillMount() {
    const latestPerson = this.props.latestUser;
    const latestPersonInfo = { 
      id: latestPerson.id, 
      first_name: latestPerson.first_name, 
      last_name: latestPerson.last_name, 
      email: latestPerson.email, 
      surveyID: this.props.surveyID };
    this.props.onChange(latestPersonInfo);
    const defaultValue = JSON.stringify(latestPersonInfo)    
  };

  render() {
    const { latestUser, surveyName, surveyID, users, showModal, closeModal, sendSurvey, onChange } = this.props;
    const userOptions = Object.keys(users).map(index => {
      let user = users[index];
      let userInfo = { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email, surveyID };
      if (index == (users.length)-1) {
        return <option selected="selected" value={ JSON.stringify(userInfo) } key={user.id}>{user.first_name + " " + user.last_name}</option>
      } else {
        return <option value={ JSON.stringify(userInfo) } key={user.id}>{user.first_name + " " + user.last_name}</option>
      };
    });

    return (
      <Modal animation={true} show={showModal} onHide={closeModal}>
        <Card className="modal">
          <Modal.Header closeButton>
            <Modal.Title>Send survey {surveyName} to user </Modal.Title> 
          </Modal.Header>
          <Modal.Body>
            <div className="formField">
              <label>User: </label>
              <select defaultValue={} onChange={e => onChange(JSON.parse(e.target.value)) }>
                { userOptions }
              </select>
            </div>          
          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup>
              <Button classes="primary sm" onClick={sendSurvey}>Send Email</Button>
              <Button classes="primary sm" onClick={closeModal}>Cancel</Button>
            </ButtonGroup>
          </Modal.Footer>
        </Card>
      </Modal>
    );
  };
};

export default SendSurveyModal;
