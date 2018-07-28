import React from 'react';
import './css/App.css';

class SignInPage extends React.Component {
  state = {
    name: ''
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    });
  }

  // TODO: Use firebase auth in this component

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
    const { name } = this.state;
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
        <button type="button" onClick={this.handleDataRetrieval}>
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
