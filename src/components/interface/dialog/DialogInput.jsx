import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

const DialogInput = ({
  name,
  fullWidth,
  helperText,
  label,
  multiline = false,
  onChange,
  style,
  type,
  value
}) => (
  <TextField
    style={{ margin: '0 5px 25px 5px' }}
    helperText={helperText}
    multiline={multiline}
    fullWidth={fullWidth}
    onChange={onChange}
    id={name}
    label={label}
    name={name}
    type={type}
    value={value}
    margin="normal"
    variant="filled" />
);

export default DialogInput;

DialogInput.propTypes = {
  name: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  multiline: PropTypes.bool,
  onChange: PropTypes.func,
  style: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.node.isRequired
};

DialogInput.defaultProps = {
  fullWidth: false,
  helperText: PropTypes.string,
  multiline: false,
  label: '',
  onChange: () => {},
  style: null,
  type: null
};
