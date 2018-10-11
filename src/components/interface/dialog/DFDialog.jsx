import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '../Button';
import styles from '../../styles';

class DFDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.onSubmit && this.props.onSubmit();
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const {
      buttonTitle,
      children,
      classes,
      footer,
      title,
      width
    } = this.props;
    return (
      <div>
        <Button type="default" onClick={this.handleClickOpen}>
          {buttonTitle}
        </Button>
        <Dialog
          fullWidth
          maxWidth={width || 'sm'}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">

          <DialogTitle classes={{ root: classes.dfdialog_title }} disableTypography id="form-dialog-title">
            {title}
          </DialogTitle>

          <div style={{ margin: '25px' }}>
            {children}
          </div>

          {footer && (
            <div className={classes.dfdialog_footer}>
              <DialogActions>
                {footer}
              </DialogActions>
            </div>
          )}
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
  title: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired
};

export default withStyles(styles)(DFDialog);
