import React from 'react';
import '../css/App.css';
import FormLabel from './FormEntries';
import { database } from '../../firebase';

class FormSubmit extends React.Component {
  db = database.ref('samTest3');

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
    this.setState({
      choreographer: event.target.value
    });
  }

  handlePerformerChange = (event) => {
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

  splitAndTrim = arr => arr.split(',').trim()

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

    const splitChoreographer = this.splitAndTrim(choreographer);
    const splitPerformers = this.splitAndTrim(performedBy);
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

    try {
      this.db.push(item);
    } catch (e) {
      console.log(e);
    }

    this.resetState();

    event.preventDefault();
  }

  handleDataRetrieval = () => {
    alert('suck it');
    const vals = [];
    this.db.once('value', (snapshot) => {
      snapshot.forEach((data) => {
        const value = {
          eventName: data.val().eventName,
          eventDate: data.val().eventDate,
          danceID: data.val().danceID,
          danceTitle: data.val().danceTitle,
          choreographer: data.val().choreographer,
          performedBy: data.val().performedBy,
          danceStyle: data.val().danceStyle,
          competitionLevel: data.val().competitionLevel,
          school: data.val().school,
          groupSize: data.val().groupSize
        };
        vals.push(value);
      });
    });
    console.log(vals);
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
            SMD
          </label>
        </button>
      </div>
    );
  }
}

export default FormSubmit;
