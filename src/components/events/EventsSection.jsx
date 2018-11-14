import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import TableHeader from '../interface/TableHeader';
import EventTableRow from './EventTableRow';
import EmptyState from '../interface/EmptyStates';
import SectionHeader from '../interface/SectionHeader';
// Testing Data
import TestData from './TestData';

class EventsSection extends React.Component {
  state = {};

  render() {
    const headings = ['Event Title', 'Event Date', 'No. Dancers', 'No. Performances', 'No. Judges'];
    return (
      <React.Fragment>
        <SectionHeader title="event" />
        <Table>
          <TableHeader headings={headings} />
          <TableBody>
            {TestData
              && TestData.map(rowProps => (<EventTableRow {...rowProps} />))
            }
          </TableBody>
        </Table>
        {!TestData && (
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
