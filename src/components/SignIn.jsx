import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { auth } from '../firebase/firebase';
import Button from './interface/Button';
import DialogInput from './interface/dialog/DialogInput';

class SignInPage extends React.Component {
  constructor(props) {
    super(props);

    const {
      user,
      history
    } = props;

    this.state = {
      email: '',
      password: ''
    };

    if (user) {
      history.push('/events');
    }
  }

  handleChange = (event) => {
    const { target: { name, value }} = event;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = () => {
    const { history } = this.props;
    const { email, password } = this.state;
    auth.onAuthStateChanged((user) => {
      if (user) {
        history.push('events');
      }
    });
    auth.signInWithEmailAndPassword(email, password);
    return false;
  }

  render() {
    const { email, password } = this.state;
    return (
      <form>
        <DialogInput
          value={email}
          name="email"
          label="Email"
          onChange={this.handleChange} />
        <DialogInput
          type="password"
          value={password}
          name="password"
          label="password"
          onChange={this.handleChange} />
        <br />
        <Button buttonType="button" onClick={this.handleSubmit} type="default">
          Submit
        </Button>
      </form>
    );
  }
}

SignInPage.propTypes = {
  history: PropTypes.shape().isRequired,
  user: PropTypes.shape()
};

SignInPage.defaultProps = {
  user: null
};

export default withRouter(SignInPage);
