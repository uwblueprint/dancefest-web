import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import { auth } from '../firebase/firebase';
import styles from './styles';

class SignInPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    const {
      user,
      history
    } = props;

    if (user) {
      history.push('/events');
    }
  }

  handleNameChange = (event) => {
    this.setState({
      email: event.target.value
    });
  }

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit = () => {
    const { email, password } = this.state;
    auth.onAuthStateChanged((user) => {
      if (user) {
        window.location('/events');
      }
    });
    auth.signInWithEmailAndPassword(email, password);
    return false;
  }

  render() {
    const { email, password } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <form>
          <label>
            Name:
            <input type="text" value={email} onChange={this.handleNameChange} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={this.handlePasswordChange} />
          </label>
          <br />
          <button type="button" onClick={this.handleSubmit} >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

SignInPage.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.shape()
};

SignInPage.defaultProps = {
  user: null
};

export default withRouter(withStyles(styles)(SignInPage));
