import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const DialogSelect = ({
  className,
  helperText,
  fullWidth,
  label,
  name,
  onChange,
  options,
  style,
  value
}) => (
  <TextField
    className={className}
    style={{ margin: '0 5px 25px 5px', ...style }}
    fullWidth={fullWidth}
    helperText={helperText}
    id="filled-select-currency"
    select
    label={label}
    name={name}
    SelectProps={{
      MenuProps: {
        getContentAnchorEl: null,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left'
        }
      }
    }}
    value={value}
    onChange={onChange}
    margin="normal"
    variant="filled">
    {options.map(option => (
      <MenuItem key={option.value} value={option.value}>{option.value}</MenuItem>
    ))}
  </TextField>
);


export default DialogSelect;

DialogSelect.propTypes = {
  className: PropTypes.string,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape()),
  onChange: PropTypes.func,
  style: PropTypes.shape(),
  value: PropTypes.string
};

DialogSelect.defaultProps = {
  className: null,
  helperText: null,
  fullWidth: false,
  label: null,
  onChange: () => {},
  options: [],
  style: null,
  value: ''
};
