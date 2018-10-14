import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TextField from '@material-ui/core/TextField';

const onChange = () => onChange && onChange()

const DialogInput = ({ name, fullWidth = false, label, helperText, onChange, style, value }) => (
  <TextField
    style={style}
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

DialogInput.propTypes = {};
