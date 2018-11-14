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

    const defaultValues = {
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
          <EventDialog type="edit" defaultValues={defaultValues} />
        </TableCell>
      </TableRow>
    );
  }
}

EventTableRow.propTypes = {
  id: PropTypes.string,
  eventTitle: PropTypes.string,
  eventDate: PropTypes.string,
  numDancers: PropTypes.number,
  numPerformances: PropTypes.number,
  numJudges: PropTypes.number
};


EventTableRow.defaultProps = {
  id: null,
  eventTitle: '',
  eventDate: '',
  numDancers: null,
  numPerformances: null,
  numJudges: null
};

export default EventTableRow;
