import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

const DialogReadOnly = ({ label, defaultValue, fullWidth = false }) => (
  <TextField
    id="standard-read-only-input"
    classes={{ underline: 'none' }}
    label={label}
    defaultValue={defaultValue}
    margin="normal"
    InputProps={{ readOnly: true }} />
);

export default DialogReadOnly;

DialogReadOnly.propTypes = {};
