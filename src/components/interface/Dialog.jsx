import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import styles from '../styles';

class DFDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const {
      buttonTitle,
      children,
      classes,
      title
    } = this.props;
    return (
      <div>
        <Button classes={{ root: classes.table_editButton }} onClick={this.handleClickOpen}>
          {buttonTitle}
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">

          <DialogTitle classes={{ root: classes.dfdialog_title }} disableTypography id="form-dialog-title">
            {title}
          </DialogTitle>

          {children}

          <div className={classes.dfdialog_footer}>
            <DialogActions>
              <Button onClick={this.handleClose} classes={{ root: classes.dfdialog_saveButton }}>
                Cancel
              </Button>
              <Button onClick={this.handleClose} classes={{ root: classes.dfdialog_cancelButton }}>
                Save
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}

DFDialog.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(DFDialog);
