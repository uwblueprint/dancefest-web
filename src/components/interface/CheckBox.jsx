import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import styles from '../styles';

// TODO: Implement error handling with maxChecked
// const error = choices.filter(v => v).length !== maxChecked;
const CheckBox = ({
  row,
  choices,
  label,
  onChange
}) => (
  <FormControl>
    {label && (<FormHelperText>{label}</FormHelperText>)}
    <FormGroup row={row}>
      {choices.map(choice => (
        <FormControlLabel
          key={choice.value}
          control={(
            <Checkbox
              color="primary"
              name={choice.value}
              checked={choice.checked}
              onChange={onChange}
              value={choice.value} />)}
          label={choice.label} />
      ))}
    </FormGroup>
  </FormControl>
);

CheckBox.propTypes = {
  choices: PropTypes.PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onChange: PropTypes.func,
  row: PropTypes.bool,
  label: PropTypes.string
};

CheckBox.defaultProps = {
  onChange: () => {},
  label: null,
  row: false
};

export default withStyles(styles)(CheckBox);
