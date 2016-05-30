// Deps
import React, { Component } from 'react';

// Styles
import classNames from 'classnames';
import styles from './removeEquipmentTabModal.css';

// Components
import Card from '../Card';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

class RemoveEquipmentTabModal extends Component {

  render() {
    const {
      onRemove,
      closeModal } = this.props;

    return (
      <div className="openModal modalDialog">
        <div className="modal">
          <Card>
            <h3>Confirmation Needed</h3>
            <p>Are you sure you want to remove this tab?</p>
            <div className="modalFooter">
              <div className="userButtonGroup">
                <ButtonGroup>
                  <Button classes="inverse sm" onClick={closeModal}>Cancel</Button>
                  <Button classes="primary sm" onClick={ onRemove }>Remove</Button>
                </ButtonGroup>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  };
};

export default RemoveEquipmentTabModal;
