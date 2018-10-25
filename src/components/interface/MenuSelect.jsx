import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CheckBoxLabels from './CheckBox';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    minWidth: 120
  },
  selectEmpty: {
  }
});

export class SimpleSelect extends React.Component {
  state = {
    age: ''
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { age } = this.state;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel htmlFor="age-simple">
            Label
          </InputLabel>
          <Select
            value={age}
            onChange={this.handleChange}
            inputProps={{
              name: 'age',
              id: 'age-simple'
            }}>
            <MenuItem value="">
              <em>
                None
              </em>
            </MenuItem>
            <MenuItem value={10}>
              <CheckBoxLabels />
            </MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.string.isRequired
};
export default withStyles(styles)(SimpleSelect);
