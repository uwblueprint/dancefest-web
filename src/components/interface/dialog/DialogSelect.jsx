import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const DialogSelect = ({
  className,
  fullWidth,
  helperText,
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
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape()),
  style: PropTypes.shape(),
  value: PropTypes.string
};

DialogSelect.defaultProps = {
  className: null,
  fullWidth: false,
  helperText: null,
  label: null,
  onChange: () => {},
  options: [],
  style: null,
  value: ''
};
