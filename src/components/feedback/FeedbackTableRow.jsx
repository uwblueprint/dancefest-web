import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';

// import EventDialog from './EventDialog';

class FeedbackTableRow extends React.Component {
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
    const numPerformances = 0;

    return (
      <TableRow>
        <TableCell>
          <Link to={`/events/${id}/performances`}>{eventTitle}</Link>
        </TableCell>
        <TableCell>
          {eventDate ? moment(eventDate).format('YYYY-MM-DD') : ''}
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

FeedbackTableRow.propTypes = {
  currentValues: PropTypes.shape({
    eventTitle: PropTypes.string,
    eventDate: PropTypes.string,
    numJudges: PropTypes.number
  }),
  id: PropTypes.string
};

FeedbackTableRow.defaultProps = {
  currentValues: {},
  id: null
};

export default FeedbackTableRow;
