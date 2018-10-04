import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
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

      return (
          <form className={classes.root} autoComplete="off">
              <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-simple">
                        Label
                    </InputLabel>
                  <Select
                      value={this.state.age}
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
                            Primary
                        </MenuItem>
                      <MenuItem value={20}>
                            Secondary
                        </MenuItem>
                      <MenuItem value={30}>
                            Post-Secondary
                        </MenuItem>
                    </Select>
                </FormControl>
            </form>
      );
    }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SimpleSelect);
