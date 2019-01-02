import React from 'react';
import isObject from 'lodash/isObject';
import pick from 'lodash/pick';

import db from '../../firebase/firebase';
import EventTableRow from './EventTableRow';
import Section from '../interface/Section';

class EventsSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: null,
      loading: true
    };
  }

  componentDidMount() {
    db.collection('events').onSnapshot((querySnapshot) => {
      const events = [];
      querySnapshot.forEach((doc) => {
        const { eventTitle, numJudges, eventDate } = doc.data();
        const date = isObject(eventDate)
          ? new Date(eventDate.seconds * 1000).toLocaleDateString()
          : eventDate;
        const event = {
          eventDate: date,
          eventTitle,
          id: doc.id,
          numJudges
        };
        events.push(event);
      });
      this.setState({ events, loading: false });
    });
  }

  // TODO: create method for getting total number of Dancers

  // TODO: create a method for converting firebase timestamp to a date

  // TODO: create a method for getting total number of performances

  render() {
    const { events, loading } = this.state;
    const headings = ['Event Title', 'Event Date', 'No. Dancers', 'No. Performances', 'No. Judges'];
    const keys = ['eventTitle', 'eventDate', 'numJudges'];
    const showEvents = Array.isArray(events) && events.length > 0;

    return (
      <Section headings={headings} loading={loading} showContent={showEvents} type="event">
        {showEvents && events.map((event) => {
          const currentValues = pick(event, keys);
          const { id } = event;
          return (
            <EventTableRow
              currentValues={currentValues}
              id={id}
              key={id} />);
        })}
      </Section>
    );
  }
}
export default EventsSection;
