import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import TableHeader from '../interface/TableHeader';
import EventTableRow from './EventTableRow';
import EmptyState from '../interface/EmptyStates';
import SectionTitle from '../interface/SectionTitle';
// Testing Data
import TestData from './TestData';

class EventsSection extends React.Component {
  state = {};

  render() {
    const headings = ['Event Title', 'Event Date', 'No. Dancers', 'No. Performances', 'No. Judges'];
    return (
      <React.Fragment>
        <SectionTitle title="events" />
        <Table>
          <TableHeader headings={headings} />
          <TableBody>
            {TestData ? (
              TestData.map(rowProps => (<EventTableRow key={rowProps.id} {...rowProps} />))
            ) : (
              <EmptyState type="event" title="Empty Events Page" subtitle="Create your first event" />
            )}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}
export default EventsSection;
