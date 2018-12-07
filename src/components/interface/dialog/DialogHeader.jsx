import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from '../../styles';
import EditDropDown from '../editing/EditDropdown';


const DialogHeader = ({
  collectionName,
  docId,
  classes,
  edit,
  title,
  onEditClick
}) => (
  <DialogTitle classes={{ root: classes.dfdialog_title }} disableTypography id="form-dialog-title">
      {title}
      <div style={{ float: 'right', color: 'black' }}>
        {edit && <EditIcon classes={{ root: classes.dfdialog_editIcon }} onClick={onEditClick} />}
        <EditDropDown collectionName={collectionName} docId={docId} />
      </div>
    </DialogTitle>
);

export default withStyles(styles)(DialogHeader);

DialogHeader.propTypes = {
  classes: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  onEditClick: PropTypes.func,
  onMoreClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

DialogHeader.defaultProps = {
  edit: false,
  onEditClick: null
};
