import React from 'react';
import { auth } from '../firebase/firebase';
import {withRouter} from 'react-router-dom';

class SignInPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: ''
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

  handleSubmit = (event) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.history.push('/events');
      }
    })
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user)  => {
      }).catch(function(error) {
        // Handle Errors here.
        console.log(error);
      });
      return false;
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="App">
        <form >
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
          <input onClick={() => { auth.signOut() }} />
        </form>
      </div>
    );
  }
}

export default withRouter(SignInPage);
