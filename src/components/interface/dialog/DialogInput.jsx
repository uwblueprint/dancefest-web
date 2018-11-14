import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

const DialogInput = ({
  name,
  className,
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
    className={className}
    style={{ margin: '0 5px 25px 5px', ...style }}
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
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  multiline: PropTypes.bool,
  onChange: PropTypes.func,
  style: PropTypes.shape(),
  type: PropTypes.string,
  value: PropTypes.node.isRequired
};

DialogInput.defaultProps = {
  className: null,
  fullWidth: false,
  helperText: null,
  multiline: false,
  label: '',
  onChange: () => {},
  style: null,
  type: null
};