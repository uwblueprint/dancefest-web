import React from 'react';
import isObject from 'lodash/isObject';
import pick from 'lodash/pick';
import axios from 'axios';

import EventDialog from './EventDialog';
import EventTableRow from './EventTableRow';
import Section from '../interface/Section';
import { getEvents } from '../../api/eventsAPI';

class EventsSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: null,
      loading: true
	};
	
	this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    getEvents().then((response) => {
      const events = Object.values(response.data);
      this.setState({ events, loading: false });
   })
  }

  handleUpdate(event) {
	const events = [...this.state.events.filter(e => e.id != event.id)];
	events.push(event);
	this.setState({events});	
  }

  // TODO: create a method for getting total number of performances

  render() {
    const { events, loading } = this.state;
    const headings = ['Event Title', 'Event Date', 'No. Performances', 'No. Judges'];
    const keys = ['event_date', 'event_title', 'num_judges'];
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
			  onUpdate={this.handleUpdate}  />);
        })}
      </Section>
    );
  }
}
export default EventsSection;
