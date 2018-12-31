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

  // TODO: Use firebase auth in this component
  handleSubmit = (event) => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.props.history.push('/events')
      }
    })
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user)  => {
          // Success 
          console.log(user);
      }).catch(function(error) {
        // Handle Errors here.
        console.log(error);
      });
      return false;
  }
  // handleSubmit = (event) => {
  //   const { name } = this.state;

  //   const item = {
  //     name
  //   };

  //   try {
  //     this.db.push(item);
  //   } catch (e) {
  //     alert(e);
  //   }
  //   alert(`submit worked: ${name}`);

  //   event.preventDefault();
  // }

  // handleDataRetrieval = () => {
  //   alert('suck it');
  //   const vals = [];
  //   this.db.once('value', (snapshot) => {
  //     snapshot.forEach((data) => {
  //       const value = {
  //         name: data.val().name
  //       };
  //       vals.push(value);
  //     });
  //   });
  //   console.log(vals);
  // }

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


// const SignInPage = () => (
//   <div>
//     <h1>
//       Sign In
//     </h1>
//   </div>
// );

export default withRouter(SignInPage);
