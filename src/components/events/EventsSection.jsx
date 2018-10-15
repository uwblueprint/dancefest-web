import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import TableHeader from '../interface/TableHeader';
import EventTableRow from './EventTableRow';
import EmptyState from '../interface/EmptyStates';

// Testing Data
import TestData from './TestData';

class EventsSection extends React.Component {
  state = {};

  render() {
    const headings = ['Event Title', 'Event Date', 'No. Dancers', 'No. Performances', 'No. Judges'];

    if (!TestData) {
      return (<EmptyState />);
    }

    return (
      <Table>
        <TableHeader headings={headings} />
        <TableBody>
          {TestData.map(rowProps => (<EventTableRow {...rowProps} />))}
        </TableBody>
      </Table>
    );
  }
}
export default EventsSection;
