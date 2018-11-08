import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Button from '../Button';
import styles from '../../styles';

class DFDialog extends React.Component {
  state = {};

  render() {
    const {
      buttonTitle,
      children,
      onClick,
      onClose,
      open,
      width
    } = this.props;
    return (
      <div>
        <Button type="default" onClick={onClick}>
          {buttonTitle}
        </Button>
        <Dialog
          fullWidth
          maxWidth={width}
          open={open}
          onClose={onClose}
          aria-labelledby="form-dialog-title">
          {children}
        </Dialog>
      </div>
    );
  }
}

DFDialog.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  width: PropTypes.string
};

DFDialog.defaultProps = {
  width: 'sm'
};

export default withStyles(styles)(DFDialog);
