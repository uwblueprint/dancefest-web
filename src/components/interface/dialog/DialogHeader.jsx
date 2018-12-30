import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DialogTitle from '@material-ui/core/DialogTitle';

import styles from '../../styles';
import EditDropDown from '../editing/EditDropdown';

const DialogHeader = ({
  classes,
  collectionName,
  docId,
  edit,
  onEditClick,
  shouldShowDropdown,
  title
}) => (
  <DialogTitle classes={{ root: classes.dfdialog_title }} disableTypography id="form-dialog-title">
    {title}
    <div style={{ float: 'right', color: 'black' }}>
      {edit && <EditIcon classes={{ root: classes.dfdialog_editIcon }} onClick={onEditClick} />}
      {shouldShowDropdown && <EditDropDown collectionName={collectionName} docId={docId} />}
    </div>
  </DialogTitle>
);

export default withStyles(styles)(DialogHeader);

DialogHeader.propTypes = {
  classes: PropTypes.shape().isRequired,
  collectionName: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  docId: PropTypes.string,
  onEditClick: PropTypes.func,
  shouldShowDropdown: PropTypes.bool,
  title: PropTypes.string.isRequired
};

DialogHeader.defaultProps = {
  docId: '',
  edit: false,
  onEditClick: null,
  shouldShowDropdown: false
};
