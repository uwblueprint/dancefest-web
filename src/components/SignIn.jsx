import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import Button from './interface/Button';
import DialogInput from './interface/dialog/DialogInput';
import Background from '../background.jpg';
import Typography from '@material-ui/core/Typography';

const sectionStyle = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
};

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    const {
      history,
      user
    } = props;

    if (user) {
      history.push('/events');
    }

    this.state = {
      email: '',
      password: ''
    };
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
      } else {
        history.push('/');
      }
    });
    auth.signInWithEmailAndPassword(email, password);
    return false;
  }

  render() {
    const { email, password } = this.state;
    return (
      <form style={sectionStyle}>
        <Typography variant="h3">
          {"OSSDF DANCEFEST"}
        </Typography>
        <DialogInput
          value={email}
          name="email"
          label={<div style={{color: "white"}}>Email</div>}
          onChange={this.handleChange} />
        <br />
        <DialogInput
          type="password"
          value={password}
          name="password"
          label={<div style={{color: "white"}}>Password</div>}
          onChange={this.handleChange} />
        <br />
        <Button buttonType="button" onClick={this.handleSubmit} type="default">
          Submit
        </Button>
      </form>
    );
  }
}

SignIn.propTypes = {
  history: PropTypes.shape().isRequired,
  user: PropTypes.shape()
};

SignIn.defaultProps = {
  user: null
};

export default withRouter(SignIn);
