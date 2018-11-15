import React from 'react';
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
      events: []
    };
  }

  componentDidMount() {
    const events = [];
    db.collection('events').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { eventTitle, numJudges, date } = doc.data();
        const eventDate = new Date(date.seconds * 1000).toLocaleDateString();
        const event = {
          id: doc.id,
          eventTitle,
          numJudges,
          eventDate
        };
        events.push(event);
      });
    }).then(() => {
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
            {events
              && events.map(event => (<EventTableRow id={event.id} {...event} />))
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
