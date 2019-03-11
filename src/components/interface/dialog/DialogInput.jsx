import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

const DialogInput = ({
  autoFocus,
  name,
  className,
  disabled,
  fullWidth,
  helperText,
  InputLabelProps,
  InputProps,
  label,
  multiline = false,
  onChange,
  placeholder,
  style,
  type,
  value
}) => (
  <TextField
    autoFocus={autoFocus}
    className={className}
    disabled={disabled}
    style={{ margin: '0 5px 25px 5px', ...style }}
    helperText={helperText}
    InputLabelProps = {InputLabelProps}
    InputProps={InputProps}
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
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  InputProps: PropTypes.shape,
  label: PropTypes.node,
  multiline: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.shape(),
  type: PropTypes.string,
  value: PropTypes.node
};

DialogInput.defaultProps = {
  autoFocus: false,
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
