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
      id,
      eventTitle,
      eventDate,
      numDancers,
      numPerformances,
      numJudges
    } = this.props;

    const currentValues = {
      eventTitle,
      eventDate,
      numJudges
    };

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
  id: PropTypes.string,
  eventTitle: PropTypes.string,
  eventDate: PropTypes.string,
  numDancers: PropTypes.string,
  numPerformances: PropTypes.string,
  numJudges: PropTypes.string
};


EventTableRow.defaultProps = {
  id: null,
  eventTitle: null,
  eventDate: null,
  numDancers: null,
  numPerformances: null,
  numJudges: null
};

export default EventTableRow;
