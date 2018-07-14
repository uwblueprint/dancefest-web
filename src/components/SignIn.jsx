import React from 'react';
import './css/App.css';
import {database} from '../firebase';

class SignInPage extends React.Component {
  state = {
    name: ''
  }

  db = database.ref('samTest');

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleSubmit = (e) => {
    const {name} = this.state;

    let item = {
      name: this.state.name
    };

    try {
      this.db.push(item);
    } catch(e) {
      alert(e);
    }
    alert(`submit worked: ${name}`);

    e.preventDefault();
  }

  handleDataRetrieval = () => {
    alert("suck it");
    var vals = [];
    this.db.once('value', snapshot => {
      snapshot.forEach(data => {
        let value = {
          name: data.val().name
        };
        vals.push(value);
      });
    });
    console.log(vals);
  }

  render() {
    const {name} = this.state;
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={this.handleNameChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
        <button onClick={this.handleDataRetrieval}>
          <label>
            SMD
          </label>
        </button>
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

export default SignInPage;
