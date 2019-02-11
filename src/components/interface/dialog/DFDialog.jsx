import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';

import { dialogType } from '../../../constants';
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
      formType,
      open,
      width
    } = this.props;
    const type = formType === dialogType.EDIT ? 'default' : 'outline';
    return (
      <div>
        <Button type={type} onClick={onClick}>
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
  buttonTitle: PropTypes.node.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  formType: PropTypes.oneOf([dialogType.EDIT, dialogType.NEW]).isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  width: PropTypes.string
};

DFDialog.defaultProps = {
  width: 'sm'
};

export default withStyles(styles)(DFDialog);
