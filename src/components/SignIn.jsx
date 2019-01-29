import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { auth } from '../firebase/firebase';

import { withStyles } from '@material-ui/core/styles';

import DialogInput from './interface/dialog/DialogInput';
import Button from './interface/Button';
import Background from '../background.jpg';
import styles from './styles';

const sectionStyle = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover" 
};

const inputLabel = (textLabel) => (<div style={{color: "white"}}>{textLabel}</div>);  

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    const {
      classes,
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
    const { classes } = this.props;
    return (
      <form style={sectionStyle}>
        <div style={{textAlign: "center", paddingTop: "50px"}}>
          <h4 style={{fontFamily: "Fjalla One", color: "white", fontSize: "25px"}}>
            OSSDF DANCEFEST
          </h4>
        </div>
        <div style={{marginTop: "100px", marginLeft: "139px"}}>
          <DialogInput
            style={{marginTop: "px"}}
            value={email}
            name="email"
            InputProps={{
              classes: {
                input: classes.multilineColor,
              }
            }}
            label={inputLabel("Email")}
            onChange={this.handleChange} />
          <br />
          <DialogInput
            type="password"
            value={password}
            name="password"
            InputProps={{
              classes: {
                input: classes.multilineColor,
              }
            }}
            label={inputLabel("Password")}
            onChange={this.handleChange} />
          <br />
          <Button buttonType="button" onClick={this.handleSubmit} type="default">
            Submit
          </Button>
        </div>
      </form>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  user: PropTypes.shape()
};

SignIn.defaultProps = {
  user: null
};

export default withRouter(withStyles(styles)(SignIn));
