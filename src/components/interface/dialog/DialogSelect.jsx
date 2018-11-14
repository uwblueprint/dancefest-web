import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const DialogSelect = ({
  label,
  helperText,
  fullWidth,
  options
}) => (
  <TextField
    style={{ margin: '0 5px 25px 5px' }}
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
  label: PropTypes.string,
  helperText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape()),
  fullWidth: PropTypes.bool
};

DialogSelect.defaultProps = {
  label: null,
  helperText: null,
  options: [],
  fullWidth: false
};
