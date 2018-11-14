import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import db from '../../firebase/firebase';

import TableHeader from '../interface/TableHeader';
import EventTableRow from './EventTableRow';
import EmptyState from '../interface/EmptyStates';
import SectionTitle from '../interface/SectionTitle';

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
        events.push(doc.data());
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
        <SectionTitle title="events" />
        <Table>
          <TableHeader headings={headings} />
          <TableBody>
            {events
              && events.map((event) => {
                const date = new Date(event.date.seconds * 1000).toLocaleDateString();
                return (
                  <EventTableRow
                    name={event.eventName}
                    date={date}
                    numJudges={event.numJudges} />
                );
              })
            }
          </TableBody>
        </Table>
        {!events && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <EmptyState type="event" title="Empty Events Page" subtitle="Create your first event" />
          </div>
        )
        }
      </React.Fragment>
    );
  }
}
export default EventsSection;
