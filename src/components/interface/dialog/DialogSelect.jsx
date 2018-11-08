import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


const DialogSelect = ({ label, helperText, fullWidth = false, style }) => (
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
    {/* {currencies.map(option => ( */}
    <MenuItem />
    {/* ))} */}
  </TextField>);

export default DialogSelect;

DialogSelect.propTypes = {};
