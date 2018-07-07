import React, { Component } from 'react';
import './../css/App.css'

class FormSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      id: ''
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDanceIDChange = this.handleDanceIDChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleDanceIDChange(event) {
    this.setState({
      id: event.target.value
    });
  }

  handleSubmit(event) {
    // handle form submission here
    alert('A name was submitted: ' + this.state.name + ' with id: ' + this.state.id);
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.name} onChange={this.handleNameChange} />
          </label> <br/>
          <label>
            DanceGroupID:
            <input type="number" value={this.state.id} onChange={this.handleDanceIDChange} />
          </label> <br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default FormSubmit
