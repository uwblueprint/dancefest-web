import React from 'react';
import '../css/App.css';

class FormSubmit extends React.Component {
  state = {
    name: '',
    id: ''
  };

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    });
  }

  handleDanceIDChange = (event) => {
    this.setState({
      id: event.target.value
    });
  }

  handleSubmit = (event) => {
    // handle form submission here
    const { name, id } = this.state;
    alert(`A name was submitted: ${name} with id: ${id}`);
    event.preventDefault();
  }

  render() {
    const { name, id } = this.state;
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={this.handleNameChange} />
          </label>
          {' '}
          <br />
          <label>
            DanceGroupID:
            <input type="number" value={id} onChange={this.handleDanceIDChange} />
          </label>
          {' '}
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default FormSubmit;
