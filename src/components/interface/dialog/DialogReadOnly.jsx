import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import styles from '../../styles';

const DialogReadOnly = ({
  classes,
  label,
  defaultValue,
  fullWidth
}) => (
  <TextField
    fullWidth={fullWidth}
    id="standard-read-only-input"
    label={label}
    defaultValue={defaultValue}
    margin="normal"
    InputLabelProps={{ shrink: true, className: classes.readOnlyLabel }}
    InputProps={{ readOnly: true, className: classes.readOnlyInput }} />
);

export default withStyles(styles)(DialogReadOnly);

DialogReadOnly.propTypes = {
  classes: PropTypes.shape().isRequired,
  defaultValue: PropTypes.string,
  fullWidth: PropTypes.bool,
  label: PropTypes.string
};

DialogReadOnly.defaultProps = {
  defaultValue: '',
  fullWidth: false,
  label: ''
};
