import React from 'react';
import classNames from 'classnames';
import styles from './sendSurveyModal.css';
import { Modal } from 'react-bootstrap';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';

const SendSurveyModal = ({surveyID, val, showModal, toggleModal, sendSurvey, onChange }) => {

  const last = val[(val.length)-1]
  const userOptions = Object.keys(val).map(value => {
    let vals = val[value];
    let userInfo = [vals.id, vals.first_name, vals.last_name, vals.email]
    return <option value={userInfo} key={vals.id}>{vals.first_name + " " + vals.last_name}</option>
  });

  return (
    <Modal animation={true} show={showModal} onHide={toggleModal}>
      <Card className="modal">
        <Modal.Header closeButton>
          <Modal.Title>Send survey to user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="formField">
            <label>User: </label>
            <select onChange={e => onChange(e.target.options[e.target.selectedIndex].value) }>
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

export default SendSurveyModal;
