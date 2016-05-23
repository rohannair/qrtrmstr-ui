import React, { PropTypes } from 'react';
import styles from './dialog.css';

import Modal from '../Modal';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

const Dialog = (props) => {
  const heading = props.heading
  ? <h1 className="modal-heading">{props.heading}</h1>
  : null;

  return (
    <Modal onClose={ props.onClose } sm>
      { heading }
      <div className="modal-body">
        { props.children }
      </div>
      <div className="actions">
        <ButtonGroup centre>
          <Button
            classes="inverse lg"
            onClick={ props.onClose }
          >
            Cancel
          </Button>

          <Button
            classes="primary lg"
            onClick={ props.onAction }
          >
            OK
          </Button>
        </ButtonGroup>
      </div>
    </Modal>
  );
};

Dialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default Dialog;
