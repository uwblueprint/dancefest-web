import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

const DialogInput = ({
  name,
  fullWidth,
  label,
  multiline = false,
  onChange,
  style,
  value
}) => (
  <TextField
    style={style}
    multiline={multiline}
    fullWidth={fullWidth}
    onChange={onChange}
    id={name}
    label={label}
    name={name}
    value={value}
    margin="normal"
    variant="filled" />
);

export default DialogInput;

DialogInput.propTypes = {
  name: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  multiline: PropTypes.bool,
  onChange: PropTypes.func,
  style: PropTypes.node,
  value: PropTypes.node.isRequired
};

DialogInput.defaultProps = {
  fullWidth: false,
  multiline: false,
  label: '',
  onChange: () => {},
  style: null
};
