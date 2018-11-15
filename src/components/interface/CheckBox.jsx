import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import styles from '../styles';

class CheckBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const {
      row,
      choices,
      label
    } = this.props;

    // TODO: Implement error handling with maxChecked
    // const error = choices.filter(v => v).length !== maxChecked;

    return (
      <FormControl>
        {label && (<FormHelperText>{label}</FormHelperText>)}
        <FormGroup row={row} label="hi">
          {choices.map((choice, index) => {
            const name = `${choice.value}-${index}`;
            const { [name]: checked } = this.state;
            return (
              <FormControlLabel
                key={name}
                control={(
                  <Checkbox
                    color="primary"
                    checked={checked}
                    onChange={this.handleChange}
                    value={choice.value} />)}
                label={choice.label} />
            );
          })}
        </FormGroup>
      </FormControl>
    );
  }
}

CheckBox.propTypes = {
  choices: PropTypes.PropTypes.arrayOf(PropTypes.shape()).isRequired,
  row: PropTypes.bool,
  label: PropTypes.string
};

CheckBox.defaultProps = {
  label: null,
  row: false
};

export default withStyles(styles)(CheckBox);
