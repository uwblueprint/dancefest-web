import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

const DialogInput = ({
  name,
  className,
  disabled,
  fullWidth,
  helperText,
  label,
  multiline = false,
  onChange,
  placeholder,
  style,
  type,
  value
}) => (
  <TextField
    className={className}
    disabled={disabled}
    style={{ margin: '0 5px 25px 5px', ...style }}
    helperText={helperText}
    multiline={multiline}
    fullWidth={fullWidth}
    onChange={onChange}
    id={name}
    label={label}
    name={name}
    placeholder={placeholder}
    type={type}
    value={value}
    margin="normal"
    variant="filled" />
);

export default DialogInput;

DialogInput.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  multiline: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.shape(),
  type: PropTypes.string,
  value: PropTypes.node
};

DialogInput.defaultProps = {
  className: null,
  disabled: false,
  fullWidth: false,
  helperText: null,
  multiline: false,
  label: '',
  onChange: () => {},
  placeholder: '',
  style: null,
  type: null,
  value: ''
};
