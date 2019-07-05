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
      event_title,
      event_date,
      num_judges
    } = currentValues;

    // TODO: fix this
    const numPerformances = 0;

    return (
      <TableRow>
        <TableCell>
          <Link to={`/events/${id}/performances`}>{event_title}</Link>
        </TableCell>
        <TableCell>
          {eventDate}
        </TableCell>
        <TableCell>
          {numPerformances}
        </TableCell>
        <TableCell>
          {num_judges}
        </TableCell>
        <TableCell>
          <EventDialog formType="edit" eventId={id} currentValues={currentValues} />
        </TableCell>
      </TableRow>
    );
  }
}

EventTableRow.propTypes = {
  currentValues: PropTypes.shape({
    event_title: PropTypes.string,
    event_date: PropTypes.string,
    num_judges: PropTypes.number
  }),
  id: PropTypes.string
};

EventTableRow.defaultProps = {
  currentValues: {},
  id: null
};

export default EventTableRow;
