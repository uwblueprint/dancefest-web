import React from "react";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const getModalStyle = () => {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

export default class Dialogue extends React.Component {
  render() {
    const { open, classes, onClose } = this.props;
    return (
      <Modal open={open} onClose={onClose}>
        <div style={getModalStyle()} className={classes.paper}>
          <Typography variant="title" id="modal-title">
            Text of modal
          </Typography>
          <Typography variant="subheading" id="simple-modal-description">
            Description of modal
          </Typography>
        </div>
      </Modal>
    );
  }
}

Dialogue.propTypes = {
  open: PropTypes.bool,
  classes: PropTypes.object,
  onClose: PropTypes.func
};
