import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';

import EventDialog from './EventDialog';

class EventTableRow extends React.Component {
  state = {};

  render() {
    const {
      currentValues,
      id
    } = this.props;

    const {
      eventTitle,
      eventDate,
      numJudges
    } = currentValues;

    // TODO: fix this
    const numDancers = 0;
    const numPerformances = 0;

    return (
      <TableRow>
        <TableCell>
          <Link to={`/events/${id}/performances`}>{eventTitle}</Link>
        </TableCell>
        <TableCell>
          {eventDate}
        </TableCell>
        <TableCell>
          {numDancers}
        </TableCell>
        <TableCell>
          {numPerformances}
        </TableCell>
        <TableCell>
          {numJudges}
        </TableCell>
        <TableCell>
          <EventDialog formType="edit" eventId={id} currentValues={currentValues} />
        </TableCell>
      </TableRow>
    );
  }
}

EventTableRow.propTypes = {
  currentValues: PropTypes.shape(),
  id: PropTypes.string
};

EventTableRow.defaultProps = {
  currentValues: null,
  id: null
};

export default EventTableRow;
