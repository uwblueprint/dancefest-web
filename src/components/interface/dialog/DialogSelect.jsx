import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const DialogSelect = ({
  className,
  label,
  helperText,
  fullWidth,
  options,
  style
}) => (
  <TextField
    className={className}
    style={{ margin: '0 5px 25px 5px', ...style }}
    fullWidth={fullWidth}
    helperText={helperText}
    id="filled-select-currency"
    select
    label={label}
    SelectProps={{ MenuProps: {}}}
    margin="normal"
    variant="filled">
    {options.map(option => (
      <MenuItem {...option} />
    ))}
  </TextField>);

export default DialogSelect;

DialogSelect.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape()),
  fullWidth: PropTypes.bool,
  style: PropTypes.shape()
};

DialogSelect.defaultProps = {
  className: null,
  label: null,
  helperText: null,
  options: [],
  fullWidth: false,
  style: null
};
