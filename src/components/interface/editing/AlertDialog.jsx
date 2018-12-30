import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import updateSettings from '../../../firebase/utils/updateSettings';
import constants from '../../../constants';

const AlertDialog = ({
  category,
  onClose,
  showAlert,
  optionName
}) => {
  const handleClose = () => {
    onClose();
  };

  const handleDelete = async () => {
    await updateSettings(category, optionName, constants.DELETE_DATA);
    handleClose();
  };

  return (
    <Dialog
      open={showAlert}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        {`Delete ${optionName}?`}
      </DialogTitle>
      <DialogContent>
        <p>Deleted categories cannot be restored.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AlertDialog.propTypes = {
  category: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  optionName: PropTypes.string.isRequired,
  showAlert: PropTypes.bool.isRequired
};


export default AlertDialog;
