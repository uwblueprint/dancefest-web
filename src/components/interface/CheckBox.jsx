import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import styles from '../styles';

class CheckBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    props.choices.forEach((choice, index) => {
      this.state[`${choice.value}-${index}`] = false;
    });
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { row, choices } = this.props;
    // TODO: Implement error handling with maxChecked
    // const error = choices.filter(v => v).length !== maxChecked;

    return (
      <FormGroup row={row}>
        {choices.map((choice, index) => {
          const name = `${choice.value}-${index}`;
          const { [name]: checked } = this.state;
          return (
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  checked={checked}
                  onChange={this.handleChange(name)}
                  value={choice.value} />)}
              label={choice.label} />
          );
        })}
      </FormGroup>
    );
  }
}

CheckBox.propTypes = {
  choices: PropTypes.shape().isRequired,
  row: PropTypes.bool.isRequired
};

export default withStyles(styles)(CheckBox);
