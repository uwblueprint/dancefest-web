import React from 'react';
import pick from 'lodash/pick';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import db from '../../firebase/firebase';
import TableHeader from '../interface/TableHeader';
import EventTableRow from './EventTableRow';
import EmptyState from '../interface/EmptyStates';
import SectionHeader from '../interface/SectionHeader';

class EventsSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: null
    };
  }

  componentDidMount() {
    db.collection('events').onSnapshot((querySnapshot) => {
      const events = [];
      querySnapshot.forEach((doc) => {
        const { eventTitle, numJudges, date } = doc.data();
        let eventDate;
        if (date) {
          eventDate = new Date(date.seconds * 1000).toLocaleDateString();
        }
        const event = {
          id: doc.id,
          eventTitle,
          numJudges,
          eventDate
        };
        events.push(event);
      });
      this.setState({ events });
    });
  }

  // TODO: create method for getting total number of Dancers

  // TODO: create a method for converting firebase timestamp to a date

  // TODO: create a method for getting total number of performances

  render() {
    const { events } = this.state;
    const headings = ['Event Title', 'Event Date', 'No. Dancers', 'No. Performances', 'No. Judges'];
    return (
      <React.Fragment>
        <SectionHeader title="event" />
        <Table>
          <TableHeader headings={headings} />
          <TableBody>
            {(Array.isArray(events) && events.length)
              && events.map((event) => {
                const keys = ['eventTitle', 'eventDate', 'numJudges'];
                const currentValues = pick(event, keys);
                return (
                  <EventTableRow
                    currentValues={currentValues}
                    id={event.id}
                    key={event.id} />);
              })
            }
          </TableBody>
        </Table>
        {!events && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <EmptyState type="event" title="Empty Events Page" subtitle="Create your first event" />
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default EventsSection;
