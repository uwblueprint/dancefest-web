import React, { Component } from 'react';
import FormSubmit from './components/form/form-submit'
import Base from './components/initialSetup/base'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Base />
        <FormSubmit />
      </div>
    );
  }
}

export default App;
