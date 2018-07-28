import React from 'react';
import '../css/App.css';
import FormLabel from './FormEntries';
import { createEvent, retrieveEventData } from '../../firebase/database';

class FormSubmit extends React.Component {
  state = {
    eventName: '',
    eventDate: '',
    danceID: '',
    danceTitle: '',
    choreographer: '',
    performedBy: '',
    danceStyle: '',
    competitionLevel: '',
    school: '',
    groupSize: ''
  };

  resetState = () => {
    this.setState({
      eventName: '',
      eventDate: '',
      danceID: '',
      danceTitle: '',
      choreographer: '',
      performedBy: '',
      danceStyle: '',
      competitionLevel: '',
      school: '',
      groupSize: ''
    });
  }

  handleEventNameChange = (event) => {
    this.setState({
      eventName: event.target.value
    });
  }

  handleDateChange = (event) => {
    // TODO: consider using a calander since we can't trust people being consistent
    // TODO: change type from TEXT to DATE
    this.setState({
      eventDate: event.target.value
    });
  }

  handleDanceIDChange = (event) => {
    this.setState({
      danceID: event.target.value
    });
  }

  handleDanceTitle = (event) => {
    this.setState({
      danceTitle: event.target.value
    });
  }

  handleChoreographerChange = (event) => {
    // TODO: Need to create UI component that will pass choreographers in an array
    this.setState({
      choreographer: event.target.value
    });
  }

  handlePerformerChange = (event) => {
    // TODO: Need to create UI component that will pass performers in an array
    this.setState({
      performedBy: event.target.value
    });
  }

  handleDanceStyleChange = (event) => {
    this.setState({
      danceStyle: event.target.value
    });
  }

  handleCompetitionLevelChange = (event) => {
    this.setState({
      competitionLevel: event.target.value
    });
  }

  handleSchoolChange = (event) => {
    this.setState({
      school: event.target.value
    });
  }

  handleGroupSizeChange = (event) => {
    this.setState({
      groupSize: event.target.value
    });
  }

  handleSubmit = (event) => {
    // TODO: handle case where state hasn't been updated
    // handle form submission here
    const {
      eventName,
      eventDate,
      danceID,
      danceTitle,
      choreographer,
      performedBy,
      danceStyle,
      competitionLevel,
      school,
      groupSize
    } = this.state;

    const splitChoreographer = choreographer.split(',').map(str => str.trim());
    const splitPerformers = performedBy.split(',').map(str => str.trim());

    const danceEntry = {
      danceID,
      danceTitle,
      choreographer: splitChoreographer,
      performedBy: splitPerformers,
      danceStyle,
      competitionLevel,
      school,
      groupSize
    };

    // TODO: check the damn variables to see they are all there...
    const item = {
      eventName,
      eventDate,
      danceEntries: [danceEntry]
    };

    createEvent(item);

    this.resetState();

    event.preventDefault();
  }

  handleDataRetrieval = () => {
    retrieveEventData();
  }

  render() {
    const {
      eventName,
      eventDate,
      danceID,
      danceTitle,
      choreographer,
      performedBy,
      danceStyle,
      competitionLevel,
      school,
      groupSize
    } = this.state;
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>

          <FormLabel jsonfield="Event Name" />
          <input type="text" value={eventName} onChange={this.handleEventNameChange} />
          <br />

          <FormLabel jsonfield="Event Date" />
          <input type="text" value={eventDate} onChange={this.handleDateChange} />
          <br />

          <FormLabel jsonfield="Dance ID" />
          <input type="number" value={danceID} onChange={this.handleDanceIDChange} />
          <br />

          <FormLabel jsonfield="Dance Title" />
          <input type="text" value={danceTitle} onChange={this.handleDanceTitle} />
          <br />

          <FormLabel jsonfield="Choreographer" />
          <input type="text" value={choreographer} onChange={this.handleChoreographerChange} />
          <br />

          <FormLabel jsonfield="Performed By" />
          <input type="text" value={performedBy} onChange={this.handlePerformerChange} />
          <br />

          <FormLabel jsonfield="Dance Style" />
          <input type="text" value={danceStyle} onChange={this.handleDanceStyleChange} />
          <br />

          <FormLabel jsonfield="Competition Level" />
          <input type="text" value={competitionLevel} onChange={this.handleCompetitionLevelChange} />
          <br />

          <FormLabel jsonfield="School" />
          <input type="text" value={school} onChange={this.handleSchoolChange} />
          <br />

          <FormLabel jsonfield="Group Size" />
          <input type="text" value={groupSize} onChange={this.handleGroupSizeChange} />
          <br />

          <input type="submit" value="Submit" />

        </form>
        <button type="button" onClick={this.handleDataRetrieval}>
          <label>
            GetAllDataFromFirebase
          </label>
        </button>
      </div>
    );
  }
}

export default FormSubmit;
