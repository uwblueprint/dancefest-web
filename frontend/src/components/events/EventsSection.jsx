import React from 'react';
import pick from 'lodash/pick';
import humps from 'humps';

import db from '../../firebase/firebase';
import EventDialog from './EventDialog';
import EventTableRow from './EventTableRow';
import Section from '../interface/Section';
import { getEvents, test } from '../../api/EventAPI';

class EventsSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: null,
      loading: true
    };
  }

  componentDidMount() {
    test().then((response) => {
      console.log('test', response);
    });
    getEvents().then((response) => {
      let events = Object.values(response.data).map(event => {
        return humps.camelizeKeys(event);
	  });
      this.setState({ events, loading: false });
   })
  }

  handleUpdate = (event) => {
	
	let events = [...this.state.events.filter(e => e.id !== event.id)];
	events.push(humps.camelizeKeys(event));
	this.setState({ events });
  }

  // TODO: create a method for getting total number of performances

  render() {
    const { events, loading } = this.state;
    const headings = ['Event Title', 'Event Date', 'No. Performances', 'No. Judges'];
    const keys = ['eventDate', 'eventTitle', 'numJudges'];
    const renderNewButton = (<EventDialog formType="new" />);
    const showEvents = Array.isArray(events) && events.length > 0;

    return (
      <Section headings={headings} loading={loading} renderNewButton={renderNewButton} showContent={showEvents} type="event">
        {showEvents && events.map((event) => {
          const { id } = event;
          const currentValues = pick(event, keys);
          return (
            <EventTableRow
              currentValues={currentValues}
              id={id}
			  key={id}
			  onUpdate={this.handleUpdate} />
			  );
        })}
      </Section>
    );
  }
}
export default EventsSection;
