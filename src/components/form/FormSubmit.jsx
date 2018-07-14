import React from 'react';
import '../css/App.css';
import {database} from '../../firebase/index';

class FormSubmit extends React.Component {
  state = {
    name: '',
    id: ''
  };
  
  db = database.ref('samTest')

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

    const { db } = this.db;

    let item = {
      name: this.state.name,
      id: this.state.id
    };

    db.push(item);

    this.setState({
      name: '',
      id: ''
    });

    event.preventDefault();
  }

  handleDataRetrieval = (event) => {
    alert("suck it");
    var vals = [];
    const {db} = this.db;
    db.once('value', snapshot => {
      snapshot.foreach(data => {
        let value = {
          name: data.val().name,
          id: data.val().id,
        };
        vals.push(value);
      });
    });
    alert(`it's yeboi: ${vals}`);
  }

  // componentWillMount = () => {
  //   const {db} = this.db;
  //   db.once('value', snapshot => {
      
  //   });
  // }

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
        <button onClick={this.handleDataRetrieval}>
          <label>
            SMD
          </label>
        </button>
      </div>
    );
  }
}

export default FormSubmit;
