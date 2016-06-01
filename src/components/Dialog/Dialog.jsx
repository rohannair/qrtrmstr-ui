import React, { PropTypes } from 'react';
import styles from './dialog.css';

import Modal from '../Modal';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

const Dialog = (props) => {
  const heading = props.heading
  ? <h3 className="modal-heading">{props.heading}</h3>
  : null;
  const buttonAction = props.buttonAction
  ? props.buttonAction
  : 'OK';

  return (
    <Modal onClose={ props.onClose } md>
      { heading }
      <div className="modal-body">
        { props.children }
      </div>
      <div className="actions">
        <ButtonGroup>
          <Button
            classes="inverse sm"
            onClick={ props.onClose }
          >
            Cancel
          </Button>

          <Button
            classes="primary sm"
            onClick={ props.onAction }
          >
            {buttonAction}
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
